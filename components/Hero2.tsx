"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIDEO_SRC = "/build-with-me-at-kaykav.mp4";
const ENROLL_URL = "https://mainstack.com/p/ship-real-mvps-with-ai-agents-kaykav";

// Hero variant B (A/B test): headline, subtitle row with a plain-text apply
// link, and a full-width course-preview player. Same content as variant A.
export default function Hero2() {
  const [open, setOpen] = useState(false);

  // lock page scroll + close on Escape while the player is open. Lenis must
  // be stopped explicitly: body overflow:hidden only blocks native scrolling,
  // and Lenis scrolls programmatically from wheel events it intercepts
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <section className="px-[var(--pad)] pt-[clamp(24px,4vw,64px)] pb-[clamp(24px,3.8vw,110px)]">
        <h1 className="ml-[-0.01em] text-[clamp(58px,13.2vw,204px)] font-extrabold leading-[0.86] tracking-[-0.025em]">
          Built, not
          <br />
          prompted
        </h1>

        <div className="mt-[clamp(28px,4.3vw,124px)] flex items-center justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3">
          <p className="text-[clamp(16px,1.6vw,26px)] font-medium">
            Ship a real, deployed MVP with AI agents in four weeks.
          </p>
          <a
            href={ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[clamp(16px,1.6vw,26px)] font-medium text-white no-underline"
          >
            Apply for Cohort 02
          </a>
        </div>
      </section>

      {/* full-width course preview player */}
      <section className="px-[var(--pad)] pb-[clamp(34px,4vw,64px)]">
        <button
          type="button"
          aria-label="Play the course preview"
          onClick={() => setOpen(true)}
          className="group relative block aspect-video w-full cursor-pointer appearance-none overflow-hidden rounded-[2px] border-0 bg-black p-0"
        >
          <video
            // React omits `muted` from SSR HTML — force it on the element
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
          {/* 64×64 play icon */}
          <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/25 transition-transform duration-[180ms] ease-[ease] group-hover:scale-105">
            <span className="ml-[5px] h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent border-l-white" />
          </span>
          <span className="absolute bottom-[clamp(16px,1.7vw,48px)] left-[clamp(16px,1.7vw,48px)] bg-white px-[14px] py-[8px] text-[clamp(11px,0.85vw,14px)] font-semibold text-brand">
            Course Preview
          </span>
        </button>
      </section>

      {/* fullscreen player */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-[var(--pad)]"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(1100px,100%)]"
            >
              <video
                src={VIDEO_SRC}
                autoPlay
                controls
                playsInline
                className="aspect-video w-full rounded-[4px] bg-black"
              />
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 cursor-pointer appearance-none border-0 bg-transparent p-2 text-[28px] leading-none font-bold text-white"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
