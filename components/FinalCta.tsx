"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CtaButton from "./CtaButton";

export default function FinalCta() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  // 0 as the section's top enters the viewport → 1 once it reaches the upper
  // third — the parallax fully settles right as the visitor arrives
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.8,
  });
  // layered depths: each line rises from further away than the one before,
  // so the section converges into place instead of sliding in as one slab
  const line1Y = useTransform(progress, [0, 1], [60, 0]);
  const line2Y = useTransform(progress, [0, 1], [120, 0]);
  const buttonY = useTransform(progress, [0, 1], [190, 0]);
  const opacity = useTransform(progress, [0, 0.4, 1], [0, 0.7, 1]);

  return (
    <section
      ref={ref}
      className="overflow-hidden border-t border-line px-[var(--pad)] pt-[clamp(50px,6vw,96px)] pb-[clamp(54px,6.4vw,104px)] text-center"
    >
      <h2 className="text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.98] tracking-[-0.02em]">
        <motion.span
          style={reduced ? undefined : { y: line1Y, opacity }}
          className="block will-change-transform"
        >
          Stop prompting.
        </motion.span>
        <motion.span
          style={reduced ? undefined : { y: line2Y, opacity }}
          className="block will-change-transform"
        >
          Start shipping.
        </motion.span>
      </h2>
      {/* full-width banner button with an arrow-to-bar glyph */}
      <motion.div
        style={reduced ? undefined : { y: buttonY, opacity }}
        className="will-change-transform"
      >
        <CtaButton
          href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
          target="_blank"
          rel="noopener noreferrer"
          size="banner"
          className="mt-[clamp(28px,3.2vw,52px)]"
        >
          Apply for Cohort 2.0
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-[1em]"
          >
            <path d="M3 12h12" />
            <path d="M9 6l6 6-6 6" />
            <path d="M20 5v14" />
          </svg>
        </CtaButton>
      </motion.div>
    </section>
  );
}
