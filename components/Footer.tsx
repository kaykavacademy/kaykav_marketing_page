"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import FooterClock from "./FooterClock";

const CELL =
  "flex items-center whitespace-nowrap border-r border-line px-[clamp(22px,2.4vw,44px)] py-[clamp(22px,2.2vw,38px)] text-[clamp(11px,0.95vw,15px)] font-extrabold uppercase tracking-[0.06em] text-white max-[720px]:whitespace-normal max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:px-[var(--pad)]";

export default function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  // completes exactly as the page bottoms out (the footer is the last element)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.8,
  });
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 0.8, 1]);
  // one depth per cell — a left-to-right convergence like the final CTA
  const depths = [
    useTransform(progress, [0, 1], [30, 0]),
    useTransform(progress, [0, 1], [55, 0]),
    useTransform(progress, [0, 1], [80, 0]),
    useTransform(progress, [0, 1], [105, 0]),
  ];
  const cell = (i: number) =>
    reduced ? undefined : { y: depths[i], opacity };

  return (
    // clips the cells while they rise in from below the footer line
    <div ref={ref} className="overflow-hidden">
      <footer className="grid grid-cols-[auto_1fr_auto_auto] items-stretch border-t border-line max-[720px]:grid-cols-1">
        <motion.div
          style={cell(0)}
          className={`${CELL} pl-[var(--pad)] pr-[clamp(26px,3vw,56px)] will-change-transform max-[720px]:pr-[var(--pad)]`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaykav-academy-logo.svg"
            alt="KayKav Academy"
            className="block h-[clamp(34px,2.9vw,45px)] w-auto"
          />
        </motion.div>
        <motion.div style={cell(1)} className={`${CELL} will-change-transform`}>
          © 2026 KayKav Academy. All rights reserved.
        </motion.div>
        <motion.div style={cell(2)} className={`${CELL} will-change-transform`}>
          Built, not prompted.
        </motion.div>
        <motion.div
          style={cell(3)}
          className={`${CELL} gap-[0.5em] border-r-0 pr-[var(--pad)] will-change-transform max-[720px]:border-b-0`}
        >
          <FooterClock /> GMT+1
        </motion.div>
      </footer>
    </div>
  );
}
