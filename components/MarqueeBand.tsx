"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import RippleTiles from "./RippleTiles";

// the track holds COPIES identical sets of a row's phrases — translating by
// exactly one set width lands on identical pixels, so wrapping is invisible
const COPIES = 3;
const SET_PCT = 100 / COPIES;

// wrap any offset into (-SET_PCT, 0] — the seamless loop window
const wrap = (v: number) => (((v % SET_PCT) + SET_PCT) % SET_PCT) - SET_PCT;

// per-row personality: its own phrases, direction, travel (in sets) across
// the scroll-past, and a start offset so columns never align — the parallax
const ROWS = [
  {
    phrases: [
      "Built, not prompted",
      "Zero to deployed",
      "Think in systems",
      "Launch beats perfect",
      "Prompt with intent",
      "Real product, real users",
      "Idea to MVP",
    ],
    dir: 1,
    speed: 0.16,
    base: -7,
    point: "left" as const,
  },
  {
    phrases: [
      "Agents do the typing",
      "You do the thinking",
      "Four weeks to launch",
      "Design before code",
      "Ship it anyway",
      "From spec to prod",
      "Build in public",
    ],
    dir: -1,
    speed: 0.22,
    base: -14,
    point: "right" as const,
  },
  {
    phrases: [
      "Guardrails on",
      "Deploy and learn",
      "Own your stack",
      "Iterate loudly",
      "Done is a feature",
      "Start before ready",
    ],
    dir: 1,
    speed: 0.11,
    base: -10,
    point: "left" as const,
  },
];

// arrow-tag silhouette — em units so the notch scales with the type
const CLIP = {
  left: "polygon(0.9em 0, 100% 0, 100% 100%, 0.9em 100%, 0 50%)",
  right:
    "polygon(0 0, calc(100% - 0.9em) 0, 100% 50%, calc(100% - 0.9em) 100%, 0 100%)",
};

// one arrow tag — the exact CtaButton hover (tile ripple + scale lift), gold
// tiles on the white card. The grid is heavy, so it mounts on first hover:
// ~60 always-mounted tags would be thousands of nodes
function Tag({ phrase, point }: { phrase: string; point: "left" | "right" }) {
  const [armed, setArmed] = useState(false);
  return (
    <span
      onPointerEnter={() => setArmed(true)}
      style={{ clipPath: CLIP[point] }}
      className={`group relative flex cursor-default select-none items-center whitespace-nowrap bg-white py-[0.8em] text-[clamp(24px,2.5vw,54px)] font-extrabold tracking-[-0.015em] text-black transition-[scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] ${
        point === "left" ? "pr-[1.1em] pl-[1.7em]" : "pr-[1.7em] pl-[1.1em]"
      }`}
    >
      {armed && <RippleTiles cols={24} rows={5} tileClass="bg-[#FDC97A]" />}
      {/* label rides above the tiles */}
      <span className="relative z-10">{phrase}</span>
    </span>
  );
}

function Row({
  row,
  progress,
}: {
  row: (typeof ROWS)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(
    progress,
    (p) => `${wrap(row.base + row.dir * row.speed * SET_PCT * p)}%`,
  );
  return (
    <motion.div
      style={{ x }}
      className="flex w-max gap-[clamp(14px,1.6vw,32px)] will-change-transform"
    >
      {Array.from({ length: COPIES }).flatMap((_, c) =>
        row.phrases.map((phrase, i) => (
          <Tag key={`${c}-${i}`} phrase={phrase} point={row.point} />
        )),
      )}
    </motion.div>
  );
}

// marquee band — three rows of arrow tags scrub horizontally as the section
// passes through the viewport (spring-smoothed, so they glide with inertia
// and reverse cleanly), each at its own speed and direction
export default function MarqueeBand() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  // 0 → 1 while the section crosses the viewport — no pinning, one scroll-past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // soft, over-damped glide — eases in late and settles without overshoot
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 32,
    mass: 1,
  });
  const still = useMotionValue(0);
  const progress = reduced ? still : smooth;

  return (
    // decorative — repeated marquee text is noise for screen readers
    <section
      ref={ref}
      aria-hidden
      className="flex flex-col gap-[clamp(20px,3.5vw,52px)] overflow-hidden border-t border-line py-[clamp(48px,8vw,130px)]"
    >
      {ROWS.map((row, i) => (
        <Row key={i} row={row} progress={progress} />
      ))}
    </section>
  );
}
