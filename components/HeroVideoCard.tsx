"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIDEO_SRC = "/build-with-me-at-kaykav.mp4";
const GOLD = "#FDC97A";

// renditions, best first — the player probes which ones exist and only
// offers those; default stays the standard 720p file
const QUALITIES = [
  { label: "1080p", src: "/build-with-me-at-kaykav-1080p.mp4" },
  { label: "720p", src: VIDEO_SRC },
];
const DEFAULT_QUALITY = QUALITIES.findIndex((q) => q.src === VIDEO_SRC);

// editorial timecode, hh:mm:ss
const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s || 0));
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const sec = String(t % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

export default function HeroVideoCard() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [available, setAvailable] = useState<boolean[]>(() =>
    QUALITIES.map((q) => q.src === VIDEO_SRC),
  );
  const [qualityMenu, setQualityMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  // playback state to restore after a quality switch swaps the src
  const resumeRef = useRef<{ t: number; play: boolean } | null>(null);

  // probe which renditions exist so the menu only offers real options
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    Promise.all(
      QUALITIES.map((q) =>
        fetch(q.src, { method: "HEAD" })
          .then((r) => r.ok)
          .catch(() => false),
      ),
    ).then((checks) => {
      if (!cancelled) setAvailable(checks);
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // lock page scroll + close on Escape while the player is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openPlayer = () => {
    setOpen(true);
    setPlaying(true);
    setMuted(false);
    setTime(0);
    setQuality(DEFAULT_QUALITY);
    setQualityMenu(false);
    resumeRef.current = null;
  };

  const switchQuality = (i: number) => {
    const v = videoRef.current;
    setQualityMenu(false);
    if (i === quality) return;
    if (v) resumeRef.current = { t: v.currentTime, play: !v.paused };
    setQuality(i);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !duration) return;
    const r = bar.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    v.currentTime = f * duration;
  };

  return (
    <>
      {/* the small snippet card — click to open the full player */}
      <button
        type="button"
        aria-label="Play the course trailer"
        onClick={openPlayer}
        className="group absolute right-[var(--pad)] bottom-[clamp(40px,5vw,80px)] block aspect-[1.42/1] w-[clamp(230px,25vw,350px)] cursor-pointer appearance-none overflow-hidden rounded-[4px] border-0 bg-transparent p-0 text-left shadow-[0_16px_48px_rgba(0,0,0,0.22)] max-[720px]:relative max-[720px]:right-auto max-[720px]:bottom-auto max-[720px]:mt-7 max-[720px]:aspect-video max-[720px]:w-full"
      >
        <video
          // React omits the `muted` attribute from SSR HTML, which can let the
          // browser start unmuted (or block autoplay) — force it on the element
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
            }
          }}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* legibility gradient over the footage */}
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,16,0)_55%,rgba(8,10,16,0.55)_100%)]" />
        {/* 64×64 play tile — brand gold, flips white on hover like the CTAs */}
        <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2px] bg-[#FDC97A] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[background-color,transform] duration-[180ms] ease-[ease] group-hover:scale-105 group-hover:bg-white">
          <span className="ml-[4px] h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent border-l-black" />
        </span>
        <span className="absolute bottom-[clamp(14px,1.4vw,22px)] left-[clamp(14px,1.4vw,22px)] text-[clamp(12px,1vw,15px)] font-semibold text-white">
          Course Trailer
        </span>
      </button>

      {/* fullscreen player — custom editorial controls, no native chrome */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative flex h-full w-full items-center justify-center"
            >
              <video
                ref={videoRef}
                key={QUALITIES[quality].src}
                src={QUALITIES[quality].src}
                autoPlay
                playsInline
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  setDuration(v.duration);
                  // seamless quality switch: pick up where we left off
                  const resume = resumeRef.current;
                  if (resume) {
                    resumeRef.current = null;
                    v.currentTime = resume.t;
                    if (resume.play) v.play();
                    else v.pause();
                  }
                }}
                // desktop fills the screen (cover); mobile shows the whole
                // frame fitted to the width, centered on black — reels-style
                className="h-full w-full cursor-pointer object-cover max-[720px]:h-auto max-[720px]:aspect-video"
              />

              {/* CLOSE — spaced uppercase, top right */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-[clamp(12px,1.6vw,24px)] right-[clamp(14px,1.8vw,28px)] cursor-pointer appearance-none rounded-[2px] border-0 bg-[#FDC97A] px-[14px] py-[8px] text-[13px] font-semibold tracking-[0.18em] text-black uppercase transition-colors hover:bg-white"
              >
                Close
              </button>

              {/* quality + play/pause + mute tiles, bottom right above the scrubber */}
              <div className="absolute right-[clamp(14px,1.8vw,28px)] bottom-[clamp(52px,6vw,84px)] flex gap-[10px]">
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Video quality"
                    onClick={() => setQualityMenu((o) => !o)}
                    className="flex h-10 cursor-pointer appearance-none items-center justify-center rounded-[2px] border-0 bg-[#FDC97A] px-3 text-[12px] font-semibold text-black transition-colors hover:bg-white"
                  >
                    {QUALITIES[quality].label}
                  </button>
                  {qualityMenu && (
                    <div className="absolute right-0 bottom-[46px] overflow-hidden rounded-[2px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                      {QUALITIES.map(
                        (q, i) =>
                          available[i] && (
                            <button
                              key={q.label}
                              type="button"
                              onClick={() => switchQuality(i)}
                              className={`block w-full cursor-pointer appearance-none border-0 px-4 py-2 text-left text-[12px] font-semibold text-black transition-colors ${
                                i === quality
                                  ? "bg-[#FDC97A]"
                                  : "bg-white hover:bg-[#FDC97A]"
                              }`}
                            >
                              {q.label}
                            </button>
                          ),
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={togglePlay}
                  className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-[2px] border-0 bg-[#FDC97A] transition-colors hover:bg-white"
                >
                  {playing ? (
                    <span className="flex gap-[4px]">
                      <span className="h-[14px] w-[3px] bg-black" />
                      <span className="h-[14px] w-[3px] bg-black" />
                    </span>
                  ) : (
                    <span className="ml-[2px] h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-black" />
                  )}
                </button>
                <button
                  type="button"
                  aria-label={muted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                  className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-[2px] border-0 bg-[#FDC97A] transition-colors hover:bg-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[16px] w-[16px]"
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="black" stroke="none" />
                    {muted ? (
                      <>
                        <line x1="16" y1="9" x2="22" y2="15" />
                        <line x1="22" y1="9" x2="16" y2="15" />
                      </>
                    ) : (
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    )}
                  </svg>
                </button>
              </div>

              {/* scrubber + timecodes along the bottom */}
              <div className="absolute inset-x-[clamp(14px,1.8vw,28px)] bottom-[clamp(12px,1.6vw,22px)]">
                <div
                  ref={barRef}
                  onClick={seek}
                  className="h-[4px] w-full cursor-pointer bg-white/25"
                >
                  <div
                    className="h-full"
                    style={{
                      background: GOLD,
                      width: duration ? `${(time / duration) * 100}%` : "0%",
                    }}
                  />
                </div>
                <div className="mt-[8px] flex justify-between text-[11px] font-medium tracking-[0.1em] text-white/85 tabular-nums">
                  <span>{fmt(time)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
