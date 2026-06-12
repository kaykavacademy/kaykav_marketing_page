"use client";

import { useCallback, useEffect, useRef, type MutableRefObject } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
  type PanInfo,
  type AnimationPlaybackControls,
} from "framer-motion";
import Reveal from "./Reveal";

type Project = {
  name: string;
  src: string;
  href: string;
  description: string;
  builder: string;
  /** override when a screenshot's ratio differs from the default frame */
  aspectClass?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Wandar",
    src: "/projects/wandar.png",
    href: "https://www.wandar.co/",
    description:
      "Plan, share, and remix travel itineraries with real recommendations from real travellers.",
    builder: "Ivar Lothbrok",
  },
  {
    name: "Nestly",
    src: "/projects/nestly.png",
    href: "https://nestlybaby.app/",
    description:
      "A shared baby tracker that keeps both carers in sync, even when the internet drops.",
    builder: "Ayobami Aderemi",
  },
  {
    name: "Drafted Desk",
    src: "/projects/draftdesk.png",
    href: "https://www.draftdesk.online/",
    description:
      "Turns scattered client feedback from chats, email, and memos into one clear workspace.",
    builder: "Mide",
  },
  {
    name: "Vows&Co",
    src: "/projects/vows-and-co.png",
    href: "https://vow-and-co.vercel.app/",
    description:
      "Keeps every wedding to-do and creative idea in one place, online or off.",
    builder: "Adesewa Owoeye",
    // native 2990×1620 — wider than the default frame; match it so nothing crops
    aspectClass: "aspect-[2990/1620]",
  },
  {
    name: "Precision",
    src: "/projects/precision.png",
    href: "https://www.tryprecisioncare.com",
    description:
      "Manages every dermatology client from first booking to final follow-up.",
    builder: "Eniola Alex",
  },
  {
    name: "DDT Structure",
    src: "/projects/ddt-structure.png",
    href: "http://www.ddtstructure.com/",
    description:
      "Runs NDT labs end to end: task assignment, staff efficiency, and project tracking.",
    builder: "Olaoluwa Obafemi",
  },
  {
    name: "ScholarMatch",
    src: "/projects/scholarmatch.png",
    href: "https://scholar-match-sable.vercel.app/",
    description:
      "Matches African students with fully funded scholarships that fit their goals.",
    builder: "Olanrewaju Olapade",
  },
];

const N = PROJECTS.length;
const COPIES = 3; // [copy 0][copy 1 = live band][copy 2] — identical, so re-basing is invisible
const SLIDES = Array.from({ length: N * COPIES }, (_, j) => PROJECTS[j % N]);

const SPRING = { type: "spring" as const, stiffness: 230, damping: 30 };
const ACTIVE_SCALE = 1.04;
const INACTIVE_SCALE = 0.82;
const INACTIVE_OPACITY = 0.35;
const DRAG_THRESHOLD = 80; // px of drag before we change slide
const VELOCITY_THRESHOLD = 500; // px/s flick
const WHEEL_COOLDOWN_MS = 350;
const WHEEL_THRESHOLD = 25;
const AUTOPLAY_MS = 2500; // self-advance cadence
const INTERACT_COOLDOWN_MS = 4000; // pause after any manual interaction

type Metrics = { step: number; inset: number };

function Slide({
  project,
  index,
  x,
  metricsRef,
  onSelect,
}: {
  project: Project;
  index: number;
  x: MotionValue<number>;
  metricsRef: MutableRefObject<Metrics>;
  onSelect: (e: React.MouseEvent<HTMLAnchorElement>, index: number) => void;
}) {
  // styling derives from the track position, not React state — so the
  // infinite-loop teleport between identical copies stays pixel-perfect
  const distance = useTransform(x, (latest) => {
    const { step, inset } = metricsRef.current;
    if (!step) return index === N ? 0 : 1; // pre-measure: Wandar active
    return Math.min(Math.abs((latest - (inset - index * step)) / step), 1);
  });
  const scale = useTransform(distance, [0, 1], [ACTIVE_SCALE, INACTIVE_SCALE]);
  const opacity = useTransform(distance, [0, 1], [1, INACTIVE_OPACITY]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-[min(56vw,1200px)] shrink-0 max-[720px]:w-[84vw]"
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        onClick={(e) => onSelect(e, index)}
        className="block no-underline"
      >
        <h3 className="mb-[clamp(14px,1.6vw,28px)] text-[clamp(24px,2.5vw,38px)] font-extrabold leading-[1.05] tracking-[-0.01em] text-white">
          {project.name}
        </h3>
        <div
          className={`relative overflow-hidden rounded-[2px] ${project.aspectClass ?? "aspect-[1.6/1]"}`}
        >
          <Image
            src={project.src}
            alt={`${project.name}, a student project`}
            fill
            draggable={false}
            loading="eager"
            sizes="(max-width: 720px) 84vw, 56vw"
            className="pointer-events-none object-cover object-top"
          />
        </div>
        <div className="mt-[clamp(14px,1.6vw,28px)] flex flex-wrap items-start justify-between gap-[clamp(12px,1.4vw,24px)]">
          <p className="max-w-[38ch] flex-1 basis-[30ch] text-[clamp(14px,1.15vw,19px)] font-medium leading-[1.4] text-white">
            {project.description}
          </p>
          {/* builder badge — white tile like the reference card */}
          <span className="whitespace-nowrap rounded-[2px] bg-white px-[clamp(12px,1.3vw,22px)] py-[clamp(9px,0.95vw,15px)] text-[clamp(12px,0.95vw,15px)] font-semibold text-black">
            Built by {project.builder}
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const x = useMotionValue(0);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<Metrics>({ step: 0, inset: 0 });
  // position within the tripled track; starts on Wandar in the middle copy
  const activeRef = useRef(N);
  const draggedRef = useRef(false);
  const wheelAtRef = useRef(0);
  // autoplay bookkeeping: never advance mid-drag, right after an interaction,
  // or while the carousel can't be seen
  const draggingRef = useRef(false);
  const visibleRef = useRef(true);
  const interactedAtRef = useRef(0);

  const snapTo = useCallback(
    (target: number, doAnimate = true) => {
      const { step, inset } = metricsRef.current;
      if (!step) return;
      // stop any in-flight animation BEFORE touching x, so it can't fight us
      animRef.current?.stop();
      let p = target;
      // infinite loop: re-base into the middle copy before animating.
      // Shifting position by ±N while shifting x by ∓N*step is pixel-identical
      // because slide styling is derived from x, never from React state.
      // jump() (not set()) — set() records the teleport as huge velocity,
      // which the following spring inherits and visibly launches the track.
      if (p < N) {
        p += N;
        x.jump(x.get() - N * step);
      } else if (p >= 2 * N) {
        p -= N;
        x.jump(x.get() + N * step);
      }
      activeRef.current = p;
      const targetX = inset - p * step;
      if (doAnimate) animRef.current = animate(x, targetX, SPRING);
      else x.jump(targetX);
    },
    [x],
  );

  // center the active slide; re-measure on resize
  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    const slide = track?.firstElementChild as HTMLElement | null;
    if (!vp || !track || !slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    metricsRef.current = {
      step: slide.offsetWidth + gap,
      inset: (vp.offsetWidth - slide.offsetWidth) / 2,
    };
    snapTo(activeRef.current, false);
  }, [snapTo]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // self-advancing: one slide every AUTOPLAY_MS, yielding to the user
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    io.observe(vp);
    const id = setInterval(() => {
      if (document.hidden || !visibleRef.current || draggingRef.current) return;
      if (Date.now() - interactedAtRef.current < INTERACT_COOLDOWN_MS) return;
      snapTo(activeRef.current + 1);
    }, AUTOPLAY_MS);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [snapTo]);

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    draggingRef.current = false;
    interactedAtRef.current = Date.now();
    let next = activeRef.current;
    if (info.offset.x < -DRAG_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD) next += 1;
    else if (info.offset.x > DRAG_THRESHOLD || info.velocity.x > VELOCITY_THRESHOLD) next -= 1;
    snapTo(next);
    // reset after the post-drag click has fired so it can be suppressed
    requestAnimationFrame(() => {
      draggedRef.current = false;
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const now = Date.now();
    if (Math.abs(delta) < WHEEL_THRESHOLD || now - wheelAtRef.current < WHEEL_COOLDOWN_MS) return;
    wheelAtRef.current = now;
    interactedAtRef.current = now;
    snapTo(activeRef.current + (delta > 0 ? 1 : -1));
  };

  const onSelect = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      // a click right after dragging is the drag's tail — ignore it
      if (draggedRef.current) {
        e.preventDefault();
        return;
      }
      // clicking a side slide focuses it instead of navigating
      if (index !== activeRef.current) {
        e.preventDefault();
        interactedAtRef.current = Date.now();
        snapTo(index);
      }
    },
    [snapTo],
  );

  return (
    <section className="overflow-hidden pt-[clamp(34px,4vw,64px)] pb-[clamp(64px,8vw,140px)]">
      <h2 className="mb-[clamp(56px,9vw,150px)] px-[var(--pad)] text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.92] tracking-[-0.025em]">
        <Reveal inline mask duration={0.7}>
          Student projects
        </Reveal>
      </h2>

      <div
        ref={viewportRef}
        className="relative"
        role="region"
        aria-label="Student projects carousel"
        tabIndex={0}
        onKeyDown={(e) => {
          interactedAtRef.current = Date.now();
          if (e.key === "ArrowRight") snapTo(activeRef.current + 1);
          if (e.key === "ArrowLeft") snapTo(activeRef.current - 1);
        }}
        onWheel={onWheel}
      >
        <motion.div
          ref={trackRef}
          className="flex cursor-grab select-none items-start gap-[clamp(28px,4.5vw,88px)] active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.15}
          onDragStart={() => {
            animRef.current?.stop();
            draggedRef.current = true;
            draggingRef.current = true;
            interactedAtRef.current = Date.now();
          }}
          onDragEnd={onDragEnd}
        >
          {SLIDES.map((p, j) => (
            <Slide
              key={`${p.name}-${Math.floor(j / N)}`}
              project={p}
              index={j}
              x={x}
              metricsRef={metricsRef}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
