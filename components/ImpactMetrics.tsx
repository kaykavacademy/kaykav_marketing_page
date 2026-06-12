"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const METRICS = [
  {
    value: 12,
    suffix: "+",
    label: "Projects successfully deployed to Live URLs",
  },
  { value: 32, suffix: "+", label: "Builders graduated from the program" },
  { value: 6, suffix: "+", label: "Countries represented across 3 continents" },
];

const COUNT_MS = 2000;
// decelerating ease — the count rushes up, then settles onto the target
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// counts 0 → value the first time it enters the viewport, writing textContent
// from a rAF loop — no React re-renders. The animated span is aria-hidden;
// screen readers (and no-JS/reduced-motion visitors) get the static value.
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 0.5,
  });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return; // keep the server-rendered final value
    if (!inView) {
      el.textContent = `0${suffix}`;
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / COUNT_MS);
      el.textContent = `${Math.round(easeOutCubic(t) * value)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {value}
        {suffix}
      </span>
      <span className="sr-only">{`${value}${suffix}`}</span>
    </>
  );
}

export default function ImpactMetrics() {
  return (
    <section aria-label="Impact metrics" className="border-t border-line">
      {METRICS.map((m, i) => (
        <Reveal key={m.label} y={20} duration={0.7} delay={i * 0.15}>
          <div
            className={`${i > 0 ? "border-t border-line" : ""} grid grid-cols-[1.7fr_1fr] items-center gap-[clamp(24px,4vw,80px)] px-[var(--pad)] py-[clamp(44px,8vw,128px)] max-[720px]:grid-cols-1 max-[720px]:gap-3`}
          >
            {/* tabular-nums: digits keep one width while counting, no jitter */}
            <span className="text-[clamp(64px,10vw,170px)] font-extrabold leading-[0.9] tracking-[-0.025em] text-white tabular-nums">
              <Counter value={m.value} suffix={m.suffix} />
            </span>
            <p className="max-w-[22ch] text-[clamp(17px,1.7vw,30px)] font-bold leading-[1.25] text-white max-[720px]:max-w-none">
              {m.label}
            </p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
