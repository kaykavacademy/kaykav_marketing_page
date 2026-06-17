"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APPLY_HREF, PROMO_CODE } from "./nav";

const CODE = PROMO_CODE;
const DELAY_MS = 1200;
// once per browser session: survives refreshes, but a closed-and-reopened
// browser/tab is a fresh session, so it shows again.
const SESSION_KEY = "kaykav-offer-session";
// also re-surface it when someone comes back after being away this long
// (tab minimised / backgrounded), so a long break counts as "returning".
const AWAY_MS = 30 * 60 * 1000;

export default function DiscountModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // first arrival of a session (a beat after load). survives refreshes; a
  // closed/reopened browser is a new session, so it shows again.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {}
    const t = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // re-surface when the visitor returns after a long break (minimised /
  // backgrounded tab), so we don't rely on refreshes
  useEffect(() => {
    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
      } else if (hiddenAt && Date.now() - hiddenAt > AWAY_MS) {
        hiddenAt = 0;
        setOpen(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // lock the page (and Lenis) while open; Esc closes
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
    } catch {
      // older browsers / insecure contexts
      const ta = document.createElement("textarea");
      ta.value = CODE;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome discount"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(13,32,64,0.72)] px-[var(--pad)] backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[460px] rounded-[4px] border-[1.5px] border-[#FDC97A] bg-brand p-[clamp(26px,6vw,40px)] text-left shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-[clamp(12px,3vw,18px)] top-[clamp(12px,3vw,18px)] flex h-9 w-9 cursor-pointer items-center justify-center rounded-[2px] text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span className="text-[clamp(11px,2.8vw,13px)] font-bold uppercase tracking-[0.14em] text-[#FDC97A]">
              Welcome offer
            </span>
            <h2 className="mt-[clamp(10px,2vw,14px)] max-w-[15ch] text-[clamp(28px,8vw,40px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
              Get&apos;s 10% OFF building with AI
            </h2>
            <p className="mt-[clamp(12px,3vw,16px)] text-[clamp(14px,3.8vw,16px)] font-medium leading-[1.5] text-white/85">
              First time here? Copy this code and use it at checkout. It&apos;s
              only good while you&apos;re on this page.
            </p>

            {/* code + copy */}
            <div className="mt-[clamp(20px,5vw,28px)] flex items-stretch gap-2 rounded-[3px] border border-dashed border-[#FDC97A]/70 bg-white/[0.06] p-[6px]">
              <span className="flex flex-1 items-center px-[clamp(12px,3vw,18px)] text-[clamp(20px,6vw,28px)] font-extrabold tracking-[0.12em] text-white">
                {CODE}
              </span>
              <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className="shrink-0 cursor-pointer rounded-[2px] bg-[#FDC97A] px-[clamp(18px,5vw,28px)] py-[clamp(12px,3.5vw,16px)] text-[clamp(14px,3.8vw,16px)] font-bold text-black transition-[scale,background-color] duration-200 hover:bg-white active:scale-[0.97]"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* path straight to checkout */}
            <a
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[clamp(16px,4vw,22px)] flex min-h-[clamp(54px,14vw,62px)] w-full items-center justify-center rounded-[2px] border-[1.5px] border-white/70 px-6 text-center text-[clamp(15px,4vw,18px)] font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              Claim discount
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
