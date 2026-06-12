"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// scroll-reveal wrapper — expo-out ease, subtle travel.
// `mask` clips the child and slides it up from below its own line box
// (use for display headings); plain mode fades + rises.
// `immediate` skips the viewport wait (above-the-fold content).
// The motion itself is a plain CSS transition: the browser composites
// transform/opacity transitions off the main thread, so the glide stays
// 60fps even while the main thread is busy (hydration, video, dev server).
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.7,
  mask = false,
  inline = false,
  once = true,
  immediate = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  mask?: boolean;
  /** render spans instead of divs (valid inside headings) */
  inline?: boolean;
  once?: boolean;
  /** animate on mount instead of waiting for the viewport */
  immediate?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  // observe the OUTER element — a mask-clipped child never intersects
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.15,
  });
  // immediate mode flips one frame after mount so the transition has a
  // server-rendered start state to ease from
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const shown = immediate ? mounted : inView;
  const Outer = inline ? "span" : "div";
  const Inner = inline ? "span" : "div";

  if (reduced) {
    return <Outer className={className}>{children}</Outer>;
  }

  if (mask) {
    return (
      // padding/negative-margin keep descenders unclipped under tight leading
      <Outer
        ref={ref as never}
        className={`block overflow-hidden pb-[0.12em] mb-[-0.12em] ${className}`}
      >
        <Inner
          className="block will-change-transform"
          style={{
            transform: shown ? "translateY(0)" : "translateY(115%)",
            transition: `transform ${duration + 0.15}s ${EASE} ${delay}s`,
          }}
        >
          {children}
        </Inner>
      </Outer>
    );
  }

  return (
    <Outer
      ref={ref as never}
      className={`block will-change-transform ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `transform ${duration}s ${EASE} ${delay}s, opacity ${duration}s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </Outer>
  );
}
