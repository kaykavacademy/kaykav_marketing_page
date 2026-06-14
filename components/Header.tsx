"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CtaButton from "./CtaButton";
import MobileMenu from "./MobileMenu";
import { APPLY_HREF, NAV_ITEMS, scrollToSection } from "./nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // mobile navbar (paradigmai-style): hide when scrolling down, reveal the
  // moment you scroll up, and always show at the very top (the hero). desktop
  // opts out entirely — it has no sticky navbar.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      if (window.innerWidth > 720) return; // mobile only
      const y = window.scrollY;
      if (y <= 8) setHidden(false); // at the top → always visible
      else if (y > lastY + 4) setHidden(true); // scrolling down → hide
      else if (y < lastY - 4) setHidden(false); // scrolling up → show
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        // desktop: a normal (non-sticky) bar that scrolls away. mobile: sticky
        // with the hide/show transform (`hidden` is only set on mobile).
        style={{
          transform:
            hidden && !menuOpen
              ? "translateY(calc(-100% - var(--ruler)))"
              : undefined,
        }}
        className="static top-[var(--ruler)] z-50 flex items-center justify-between gap-5 border-b border-line bg-brand px-[var(--pad)] py-[clamp(14px,1.4vw,22px)] transition-transform duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] will-change-transform max-[720px]:sticky"
      >
        <a href="#" aria-label="KayKav Academy" className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaykav-academy-logo.svg"
            alt="KayKav Academy"
            className="block h-[clamp(36px,3.2vw,50px)] w-auto"
          />
        </a>

        {/* desktop: section links + apply CTA */}
        <nav className="flex items-center gap-[clamp(20px,2.4vw,44px)] max-[720px]:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-[clamp(15px,1.15vw,19px)] font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
          <CtaButton
            href={APPLY_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for Cohort 2.0
          </CtaButton>
        </nav>

        {/* mobile: hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="hidden h-[clamp(44px,12vw,56px)] w-[clamp(58px,16vw,76px)] cursor-pointer appearance-none items-center justify-center rounded-[2px] border-0 bg-[#FDC97A] transition-[scale] duration-200 active:scale-[0.95] max-[720px]:inline-flex"
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block h-[2.5px] w-[24px] bg-black" />
            <span className="block h-[2.5px] w-[24px] bg-black" />
            <span className="block h-[2.5px] w-[24px] bg-black" />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
