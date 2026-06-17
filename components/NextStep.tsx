"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import CtaButton from "./CtaButton";
import OfferRibbon from "./OfferRibbon";
import Reveal from "./Reveal";
import { PROMO_CODE } from "./nav";
import { useCopyCode } from "./useCopyCode";

const PRICE = "NGN 90,000";
const DISCOUNTED_PRICE = "NGN 81,000";
const APPLY_HREF = "https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav";

const PERKS = [
  "Live sessions + recordings",
  "Ship to a live URL",
  "Get templates, prompts, and MDs",
  "Access to community of builders",
  "Access future course updates",
  "Certificate of completion",
];

// how far the panel climbs up over the testimonials as it scrolls in (px)
const CLIMB = 200;

// chunky right-pointing banner arrow — a solid nod to the line-art arrow on
// the final CTA, nudges forward on row hover (micro-interaction)
function ArrowMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-[clamp(18px,1.8vw,28px)] w-auto shrink-0 text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/perk:translate-x-[3px]"
    >
      <path d="M1 3h14l8 9-8 9H1z" />
    </svg>
  );
}

export default function NextStep() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { copied, copy } = useCopyCode();
  // the climb is a desktop scroll-scene flourish; off for reduced-motion and
  // the stacked mobile layout (which has no pinned testimonials beneath it)
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 721px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduced]);

  // 0 when the panel's top is at the viewport bottom, 1 when it reaches the top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // content rides CLIMB→0 as the panel travels up, so it slides over the
  // testimonials beneath it; the section's negative margin removes the same
  // distance from the flow, so nothing below ever gains a gap
  const y = useTransform(scrollYProgress, [0, 1], [CLIMB, 0]);

  return (
    <section
      ref={ref}
      // sits above the testimonials scene so the solid panel can cover it
      className="relative z-20"
      style={{ marginTop: enabled ? -CLIMB : 0 }}
    >
      <motion.div
        style={{ y: enabled ? y : 0 }}
        className="border-t border-line bg-brand px-[var(--pad)] pt-[var(--section-pt)] pb-[var(--section-pb)]"
      >
        <h2 className="mb-[clamp(40px,6vw,100px)] text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.92] tracking-[-0.025em]">
          <Reveal inline mask duration={0.7}>
            Take your next step
          </Reveal>
        </h2>

        <div className="grid grid-cols-2 border border-line max-[720px]:grid-cols-1">
          {/* price */}
          <div className="relative overflow-hidden border-r border-line p-[clamp(28px,3.2vw,60px)] max-[720px]:border-r-0 max-[720px]:border-b">
            <OfferRibbon position="right" />
            <Reveal y={24} duration={0.7}>
              <p className="text-[clamp(15px,1.3vw,22px)] font-bold tracking-[-0.005em] text-white">
                Course Price
              </p>
              <p className="mt-[clamp(14px,1.6vw,28px)] text-[clamp(38px,5.8vw,88px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-white tabular-nums">
                {PRICE}
              </p>
            </Reveal>
            <Reveal
              y={20}
              duration={0.6}
              delay={0.12}
              className="mt-[clamp(28px,3.2vw,52px)]"
            >
              <CtaButton
                href={APPLY_HREF}
                target="_blank"
                rel="noopener noreferrer"
                size="block"
              >
                Join the course
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
            </Reveal>
            <Reveal
              y={16}
              duration={0.6}
              delay={0.18}
              className="mt-[clamp(16px,1.8vw,24px)]"
            >
              <div className="flex flex-wrap items-center gap-x-[7px] gap-y-2 text-[clamp(13px,1.05vw,16px)] font-medium leading-[1.5] text-white/75">
                <span>Use code</span>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={`Copy code ${PROMO_CODE}`}
                  className="inline-flex items-center gap-[5px] rounded-[2px] border border-[#FDC97A]/60 px-[9px] py-[4px] text-[12px] font-bold tracking-[0.04em] text-[#FDC97A] transition-[scale] duration-200 active:scale-[0.96]"
                >
                  {copied ? (
                    "Copied!"
                  ) : (
                    <>
                      {PROMO_CODE}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className="h-[13px] w-[13px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="11" height="11" rx="2" />
                        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                    </>
                  )}
                </button>
                <span>
                  at checkout for 10% off,{" "}
                  <span className="font-bold text-white">
                    just {DISCOUNTED_PRICE}
                  </span>{" "}
                  <span className="text-white/55 line-through">{PRICE}</span>.
                </span>
              </div>
            </Reveal>
          </div>

          {/* what's included */}
          <div className="p-[clamp(28px,3.2vw,60px)]">
            <Reveal y={24} duration={0.7} delay={0.05}>
              <h3 className="mb-[clamp(22px,2.6vw,44px)] max-w-[18ch] text-[clamp(22px,2.8vw,42px)] font-extrabold leading-[1.12] tracking-[-0.015em] text-white">
                Ship real MVPs with AI Agents
              </h3>
            </Reveal>
            <ul className="space-y-[clamp(14px,1.7vw,28px)]">
              {PERKS.map((perk, i) => (
                <li key={perk}>
                  <Reveal y={20} duration={0.6} delay={0.1 + i * 0.06}>
                    <span className="group/perk flex items-center gap-[6px] text-[clamp(15px,1.45vw,24px)] font-bold tracking-[-0.005em] text-white">
                      <ArrowMark />
                      {perk}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
