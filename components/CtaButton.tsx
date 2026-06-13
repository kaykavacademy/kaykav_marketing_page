import type { AnchorHTMLAttributes, ReactNode } from "react";
import RippleTiles from "./RippleTiles";

type Variant = "solid" | "outline";
type Size = "nav" | "hero" | "banner" | "block";

const VARIANT: Record<Variant, string> = {
  // gold button — white tiles ripple in, label stays black
  solid: "bg-[#FDC97A] text-black",
  // outlined button — white tiles ripple in (border blends into the fill), label flips to black
  outline: "border-[1.5px] border-white bg-transparent text-white hover:text-black",
};

const TILE: Record<Variant, string> = {
  solid: "bg-white",
  outline: "bg-white",
};

const SIZE: Record<Size, string> = {
  // nav CTA — same weight as the hero buttons
  nav: "min-h-[var(--btn-h)] text-[length:var(--btn-fs)] font-semibold tracking-[-0.01em]",
  // hero — 24px, weight 600; 16px on mobile like every other button
  hero: "min-h-[var(--btn-h)] text-[24px] font-semibold tracking-normal max-[720px]:text-[16px]",
  // banner — wide final CTA (75% of the content width), scales down on mobile
  banner:
    "min-h-[clamp(64px,11.5vw,170px)] w-[75%] text-[clamp(20px,2.6vw,40px)] font-semibold tracking-[-0.01em] max-[720px]:text-[16px]",
  // block — fills its container (e.g. a card column), tall and prominent
  block:
    "min-h-[clamp(64px,6.5vw,100px)] w-full text-[clamp(18px,2vw,30px)] font-semibold tracking-[-0.01em] max-[720px]:text-[16px]",
};

// water-ripple fill grids (see RippleTiles) — denser on bigger buttons so the
// tiles stay small and dispersed
const GRID: Record<Size, [number, number]> = {
  nav: [18, 6],
  hero: [18, 6],
  banner: [40, 8],
  block: [40, 8],
};

type CtaButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function CtaButton({
  variant = "solid",
  size = "nav",
  className = "",
  children,
  ...props
}: CtaButtonProps) {
  const [cols, rows] = GRID[size];
  return (
    <a
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-[2px] px-[var(--btn-px)] no-underline transition-[color,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-[0.97] ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...props}
    >
      <RippleTiles cols={cols} rows={rows} tileClass={TILE[variant]} />
      {/* label rides above the tiles */}
      <span className="relative z-10 inline-flex items-center gap-[0.4em]">
        {children}
      </span>
    </a>
  );
}
