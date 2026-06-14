"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { APPLY_HREF, NAV_ITEMS, SOCIAL_LINKS, scrollToSection } from "./nav";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  // lock the page (and Lenis) while the overlay is up
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
    };
  }, []);

  const go = (href: string) => {
    onClose();
    // resume scrolling now so the smooth jump runs as the menu dismisses
    document.body.style.overflow = "";
    window.__lenis?.start();
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    // opaque panel sliding in from the right as one solid sheet — no opacity
    // fade (that was the flicker, the moving page showed through); transform
    // only, so it stays GPU-composited and buttery in both directions
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.45, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[100] flex flex-col bg-brand will-change-transform"
    >
      {/* top bar mirrors the sticky header — same metrics + full-width divider */}
      <div className="flex items-center justify-between gap-5 border-b border-line px-[var(--pad)] py-[clamp(14px,1.4vw,22px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kaykav-academy-logo.svg"
          alt="KayKav Academy"
          className="block h-[clamp(36px,3.2vw,50px)] w-auto"
        />
        <button
          type="button"
          onClick={onClose}
          // same height as the header hamburger so the bar (and its divider)
          // line up exactly when the menu opens and closes
          className="inline-flex h-[clamp(44px,12vw,56px)] cursor-pointer appearance-none items-center justify-center rounded-[2px] border-0 bg-[#FDC97A] px-[clamp(20px,5vw,28px)] text-[clamp(15px,4vw,18px)] font-bold text-black transition-[scale] duration-200 active:scale-[0.97]"
        >
          Close
        </button>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col px-[var(--pad)] pt-[clamp(36px,11vw,64px)] pb-[calc(env(safe-area-inset-bottom)+clamp(24px,7vw,40px))]">
        {/* section links */}
        <nav className="flex flex-col items-start gap-[clamp(16px,4vw,28px)]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-[clamp(40px,12vw,60px)] font-bold leading-[1.05] tracking-[-0.02em] text-white transition-opacity duration-200 active:opacity-70"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* apply + socials pinned to the bottom */}
        <div className="mt-auto">
          <a
            href={APPLY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[clamp(60px,16vw,72px)] w-full items-center justify-center rounded-[2px] bg-[#FDC97A] px-6 text-center text-[clamp(16px,4.6vw,20px)] font-semibold text-black transition-[scale] duration-200 active:scale-[0.98]"
          >
            Apply for Cohort 2.0
          </a>
          <div className="mt-[clamp(24px,7vw,36px)] flex gap-[clamp(24px,8vw,44px)]">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[clamp(14px,4vw,17px)] font-semibold tracking-[-0.005em] text-white no-underline transition-opacity duration-200 hover:opacity-70"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
