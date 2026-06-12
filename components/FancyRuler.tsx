"use client";

import { useEffect, useRef } from "react";
import Guides from "@scena/guides";

// design-tool chrome: glassy rulers pinned to the top and left edges,
// scroll-synced to the document, with gold markers tracking the cursor.
// Users can drag guides out of either ruler (and drag them back to remove).
const SIZE = 26; // ruler thickness, px (keep in sync with --ruler in globals.css)
const GOLD = "#FDC97A";

export default function FancyRuler() {
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hMarkerRef = useRef<HTMLDivElement>(null);
  const vMarkerRef = useRef<HTMLDivElement>(null);
  const hLabelRef = useRef<HTMLSpanElement>(null);
  const vLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const common = {
      backgroundColor: "transparent",
      lineColor: "rgba(255,255,255,0.4)",
      textColor: "rgba(255,255,255,0.85)",
      unit: 100,
      segment: 10,
      font: "9px sans-serif",
      displayDragPos: true,
      dragPosFormat: (v: number) => `${Math.round(v)}`,
    };
    // horizontal = top ruler, drags out horizontal guides;
    // vertical = left ruler, drags out vertical guides
    const h = new Guides(hRef.current!, { type: "horizontal", ...common });
    const v = new Guides(vRef.current!, { type: "vertical", ...common });

    const mouse = { x: -1, y: -1 };

    const paintMarkers = () => {
      if (mouse.x < 0) return;
      hMarkerRef.current!.style.transform = `translateX(${mouse.x}px)`;
      vMarkerRef.current!.style.transform = `translateY(${mouse.y}px)`;
      hLabelRef.current!.textContent = `${Math.round(mouse.x + window.scrollX)}`;
      vLabelRef.current!.textContent = `${Math.round(mouse.y + window.scrollY)}`;
    };
    const onScroll = () => {
      // ruler ticks follow their own axis; guide lines shift with the cross axis
      h.scroll(window.scrollX);
      h.scrollGuides(window.scrollY);
      v.scroll(window.scrollY);
      v.scrollGuides(window.scrollX);
      paintMarkers();
    };
    const onResize = () => {
      h.resize();
      v.resize();
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      paintMarkers();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      h.destroy();
      v.destroy();
    };
  }, []);

  const glass =
    "fixed z-[60] bg-[rgba(13,32,64,0.55)] backdrop-blur-[6px] max-md:hidden";

  return (
    <>
      {/* top ruler */}
      <div
        aria-hidden
        className={`${glass} left-0 right-0 top-0 border-b border-white/15`}
        style={{ height: SIZE }}
      >
        <div ref={hRef} className="relative h-full w-full" />
        <div
          ref={hMarkerRef}
          className="pointer-events-none absolute inset-y-0 left-0 w-px will-change-transform"
          style={{ background: GOLD }}
        >
          <span
            ref={hLabelRef}
            className="absolute bottom-[3px] left-[3px] rounded-[2px] px-[3px] text-[9px] font-semibold leading-[12px] text-black"
            style={{ background: GOLD }}
          />
        </div>
      </div>

      {/* left ruler */}
      <div
        aria-hidden
        className={`${glass} bottom-0 left-0 top-0 border-r border-white/15`}
        style={{ width: SIZE }}
      >
        <div ref={vRef} className="relative h-full w-full" />
        <div
          ref={vMarkerRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-px will-change-transform"
          style={{ background: GOLD }}
        >
          <span
            ref={vLabelRef}
            className="absolute left-[2px] top-[3px] rounded-[2px] px-[3px] text-[9px] font-semibold leading-[12px] text-black"
            style={{ background: GOLD }}
          />
        </div>
      </div>

      {/* corner tile */}
      <div
        aria-hidden
        className={`${glass} pointer-events-none left-0 top-0 flex items-center justify-center border-b border-r border-white/15`}
        style={{ width: SIZE, height: SIZE }}
      >
        <span className="size-[7px] rounded-[1px]" style={{ background: GOLD }} />
      </div>
    </>
  );
}
