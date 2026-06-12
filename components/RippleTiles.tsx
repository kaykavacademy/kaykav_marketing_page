import type { CSSProperties } from "react";

// anime.js-style grid stagger (codepen.io/juliangarnier/pen/MZXQNV) — delay
// grows strictly with distance from the center so each ring fires in
// sequence, and every tile is pushed outward along the wave direction.
// Render inside a `group relative overflow-hidden` parent (or an absolutely
// positioned clipping layer); tiles ripple in while the group is hovered.
const WAVE_SPREAD = 0.24; // s from center to the farthest corner, any grid size
const PUSH = 16; // px each tile travels as the wavefront reaches it
// random size buckets — small tiles snap in fast, big ones bloom slower and
// overlap their neighbors; min scale 1 keeps the final fill solid
const SCALE = [1, 1.45, 1.9];
const DURATION = [140, 200, 270];

type Tile = {
  delay: number;
  tx: number;
  ty: number;
  scale: number;
  duration: number;
};

const cache = new Map<string, Tile[]>();

function tilesFor(cols: number, rows: number): Tile[] {
  const key = `${cols}x${rows}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.hypot(cx, cy);
  const tiles = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const dx = col - cx;
    const dy = row - cy;
    const dist = Math.hypot(dx, dy);
    const bucket = (((i * 73 + 29) % 53) % 3) as 0 | 1 | 2; // deterministic (SSR-safe)
    return {
      delay: (dist / maxDist) * WAVE_SPREAD,
      tx: dist ? (-dx / dist) * PUSH : 0,
      ty: dist ? (-dy / dist) * PUSH : 0,
      scale: SCALE[bucket],
      duration: DURATION[bucket],
    };
  });
  cache.set(key, tiles);
  return tiles;
}

export default function RippleTiles({
  cols,
  rows,
  tileClass,
}: {
  cols: number;
  rows: number;
  tileClass: string;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`,
        gridTemplateRows: `repeat(${rows},minmax(0,1fr))`,
      }}
    >
      {tilesFor(cols, rows).map((t, i) => (
        <span
          key={i}
          style={
            {
              transitionDelay: `${t.delay}s`,
              transitionDuration: `${t.duration}ms`,
              "--tx": `${t.tx}px`,
              "--ty": `${t.ty}px`,
              "--s": t.scale,
            } as CSSProperties
          }
          className={`opacity-0 transition-[transform,opacity] ease-[cubic-bezier(0.37,0,0.63,1)] [transform:translate(var(--tx),var(--ty))_scale(0)] group-hover:opacity-100 group-hover:[transform:translate(0,0)_scale(var(--s))] ${tileClass}`}
        />
      ))}
    </span>
  );
}
