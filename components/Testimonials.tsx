"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Reveal from "./Reveal";

// Source of truth: kaykav-testimonials.md (Cohort 01)
const TESTIMONIALS = [
  {
    name: "Adesewa",
    color: "#f3b50c",
    tag: "One builder, whole product team",
    quote:
      "The value I got was way more than the money I paid. As a designer, I moved through every function of a proper product team on one journey, walking away with a new understanding of databases and code stacks.",
  },
  {
    name: "John",
    color: "#5bc0eb",
    tag: "The missing piece",
    quote:
      "As a Product Manager and Designer, the only piece missing from my skill set was development. This has been one of my best investments this year. I've learned to build products from scratch with AI, and I'm already applying it in my 9-5 by collaborating more effectively with my dev team.",
  },
  {
    name: "Eniola",
    color: "#67d489",
    tag: "Engineering for my startup",
    quote:
      "I came in to learn how to set up the engineering for my startup, and this gave me all the empowerment I needed to get started. It's mind-blowing what's now possible just from knowing how to think systematically.",
  },
  {
    name: "Sewa",
    color: "#f48fb1",
    tag: "Building real solutions",
    quote:
      "The value I got was way more than the money I paid. I joined just to build my portfolio, and now I'm creating a tool that solves a real problem: a wedding and ideas journal app.",
  },
  {
    name: "Wole",
    color: "#ef6351",
    tag: "Prompting is a technical skill",
    quote:
      "Prompting is a technical skill, not a 'one-shot' thing. You can't out-prompt a designer who can define every modality of the result they want, or an engineer who puts guardrails on the agents. Learn the skill of using AI, not just the vibes.",
  },
  {
    name: "Olaoluwa",
    color: "#b39df3",
    tag: "Shipping products fast",
    quote:
      "A dream come true. You gave the first cohort a spark. Three weeks in, I'd shipped an expense tracker with Claude and Google Antigravity using well-constructed prompts. Cheers to shipping products fast.",
  },
  {
    name: "John",
    color: "#ffa552",
    tag: "From idea to launch",
    quote:
      "In May 2026, I had no idea how to build my product ideas. One month later, I built BitePlan to 80% launch readiness and started two more products. For me, that's a huge leap. Thanks to Kaykav and the team. Anyone serious about building products should take the class.",
  },
];

const N = TESTIMONIALS.length;

// Every visual in this section is a pure function of the section's scroll
// progress (one MotionValue). No timers, no one-shot enter/exit animations,
// no React state in the scroll path — so any scroll speed or direction,
// forwards or backwards, lands on exactly the same pixels, and a refresh
// mid-section reconstructs the correct state from the scroll position alone.

// card i deals onto the pile across this slice of its 1/N progress window
const DEAL_START = 0.12;
const DEAL_END = 0.55;
// hand-placed pile look: deterministic final tilt + nudge per card —
// cycled by their own length so the testimonial array can grow freely
const TILT = [-2, 2.5, -1.5, 3, -2.5, 2, -3];
const NUDGE_X = [0, 16, -12, 10, -16, 14, -8];
const NUDGE_Y = [0, 12, 22, 8, 18, 26, 14];

const CARD =
  "origin-center px-[clamp(22px,2.2vw,40px)] py-[clamp(20px,2vw,36px)] text-left text-[clamp(13px,1.5vw,24px)] font-extrabold uppercase leading-[1.32] tracking-[0.2px] text-[#131313] shadow-[14px_16px_0_rgba(0,0,0,0.3)]";

function CardBody({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <>
      {t.quote}
      <div className="mt-[1.2em] flex items-end justify-between gap-3 text-[0.72em]">
        <span>{t.name}</span>
        <span className="text-right">{t.tag}</span>
      </div>
    </>
  );
}

// one sticker in the pile — its transform is a clamped map of section
// progress, so scrubbing backwards plays the exact reverse of forwards
function Sticker({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const t = TESTIMONIALS[index];
  const from = (index + DEAL_START) / N;
  const to = (index + DEAL_END) / N;
  const p = useTransform(progress, [from, to], [0, 1]);
  const opacity = useTransform(p, [0, 0.35, 1], [0, 1, 1]);
  const y = useTransform(p, [0, 1], [110, NUDGE_Y[index % NUDGE_Y.length]]);
  const rotate = useTransform(p, [0, 1], [10, TILT[index % TILT.length]]);
  const scale = useTransform(p, [0, 1], [0.92, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotate,
        scale,
        x: NUDGE_X[index % NUDGE_X.length],
        zIndex: index, // constant stacking order — later cards always on top
        backgroundColor: t.color,
      }}
      className={`${index === 0 ? "relative" : "absolute inset-x-0 top-0"} ${CARD}`}
    >
      <CardBody t={t} />
    </motion.div>
  );
}

// name row — highlight color derives from progress, not from React state
function Name({
  index,
  progress,
  onJump,
  itemRef,
}: {
  index: number;
  progress: MotionValue<number>;
  onJump: (i: number) => void;
  itemRef: (el: HTMLLIElement | null) => void;
}) {
  const color = useTransform(progress, (v) => {
    const active = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    return active === index ? "#ffffff" : "#7da0cd";
  });
  // gold caret marks the active name — function form keeps it JS-driven and
  // in lockstep with the color above (range form gets compiled to a native
  // scroll animation, which proved unreliable here)
  const caretOpacity = useTransform(progress, (v) => {
    const active = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    return active === index ? 1 : 0;
  });
  return (
    <li ref={itemRef}>
      <motion.button
        type="button"
        style={{ color }}
        onClick={() => onJump(index)}
        className="relative inline-block cursor-pointer appearance-none border-0 bg-transparent p-0 text-[clamp(40px,min(9vw,11.5vh),130px)] font-extrabold leading-[1.08] tracking-[-0.02em]"
      >
        <motion.span
          aria-hidden
          style={{ opacity: caretOpacity }}
          className="absolute top-1/2 left-[-0.62em] h-0 w-0 -translate-y-1/2 border-y-[0.21em] border-l-[0.36em] border-y-transparent border-l-[#FDC97A]"
        />
        {TESTIMONIALS[index].name}
      </motion.button>
    </li>
  );
}

export default function Testimonials() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const linesRef = useRef<number[]>([]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // pile position: slotY has a single writer — placeSlot — invoked on scroll
  // changes and after re-measures, both reading the same progress value
  const slotY = useMotionValue(0);

  const placeSlot = useCallback(() => {
    const lines = linesRef.current;
    const slot = slotRef.current;
    const panel = panelRef.current;
    if (!lines.length || !slot || !panel) return;
    const v = scrollYProgress.get();
    // interpolate between adjacent name-row centers, then keep the pile
    // clear of the pinned panel's edges
    const t = Math.max(0, Math.min(N - 1, v * N - 0.5));
    const i0 = Math.floor(t);
    const i1 = Math.min(N - 1, i0 + 1);
    const line = lines[i0] + (lines[i1] - lines[i0]) * (t - i0);
    const edge = Math.max(44, window.innerHeight * 0.07);
    const max = panel.clientHeight - slot.offsetHeight - edge;
    slotY.set(Math.max(edge, Math.min(line - slot.offsetHeight / 2, max)));
  }, [scrollYProgress, slotY]);

  useMotionValueEvent(scrollYProgress, "change", placeSlot);

  // measure name-row centers on mount and whenever the panel resizes
  // (window resize, font load, viewport change) — then re-place immediately
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      const panelRect = panel.getBoundingClientRect();
      linesRef.current = itemRefs.current.map((li) => {
        if (!li) return 0;
        const r = li.getBoundingClientRect();
        return r.top - panelRect.top + r.height / 2;
      });
      placeSlot();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [placeSlot]);

  // clicking a name scrolls the page to that card's progress position —
  // it drives the same single source of truth instead of a second channel
  const jumpTo = useCallback((i: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const v = Math.min(1, (i + DEAL_END + 0.1) / N);
    const target = top + v * span;
    // ride the Lenis easing when present — native smooth scroll would fight it
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    // tall wrapper = pin duration: 100vh panel + ~50vh of scroll per card
    <section
      ref={wrapperRef}
      className="relative h-[420vh] border-t border-line pt-[clamp(32px,6vh,88px)] max-[720px]:h-auto"
    >
      <h2 className="mb-[clamp(56px,9vw,150px)] px-[var(--pad)] text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.92] tracking-[-0.025em]">
        <Reveal inline mask duration={0.7}>
          Stories worth sharing
        </Reveal>
      </h2>

      {/* pin below the sticky navbar so cards near the top rows stay visible */}
      <div
        ref={panelRef}
        className="sticky top-[var(--header-h)] flex h-[calc(100vh-var(--header-h))] flex-col justify-center overflow-hidden px-[var(--pad)] py-[clamp(36px,7vh,96px)] max-[720px]:static max-[720px]:h-auto max-[720px]:overflow-visible max-[720px]:py-[clamp(40px,5vw,84px)]"
      >
        {/* names — indented in from the gutter; desktop scroll scene only */}
        <ul className="relative z-[1] list-none space-y-[clamp(4px,1vh,14px)] pl-[clamp(32px,12vw,240px)] text-left max-[720px]:hidden">
          {TESTIMONIALS.map((_, i) => (
            <Name
              // index key: names can repeat (two Johns), entries never reorder
              key={i}
              index={i}
              progress={scrollYProgress}
              onJump={jumpTo}
              itemRef={(el) => {
                itemRefs.current[i] = el;
              }}
            />
          ))}
        </ul>

        {/* the sticker pile rides the name rows; cards deal on in order and
            peel off in exact reverse. pointer-events-none keeps names usable */}
        <motion.div
          ref={slotRef}
          data-testid="testimonial-card-wrap"
          style={{ y: slotY }}
          className="pointer-events-none absolute top-0 right-[clamp(16px,3vw,64px)] z-[5] w-[clamp(280px,40vw,640px)] max-[720px]:hidden"
        >
          {TESTIMONIALS.map((_, i) => (
            <Sticker key={i} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* mobile: a plain, static pile — no scroll choreography to break */}
        <div className="hidden max-[720px]:flex max-[720px]:flex-col max-[720px]:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: t.color,
                rotate: `${TILT[i % TILT.length]}deg`,
              }}
              className={CARD}
            >
              <CardBody t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
