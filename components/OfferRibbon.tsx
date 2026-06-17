// red diagonal corner ribbon, pinned to a top corner of a `relative
// overflow-hidden` (or fixed) parent. `lg` for the pricing card, `sm` for the
// slim promo bar; `position` picks the top-left or top-right corner.
const PRESETS: Record<string, string> = {
  "lg-right":
    "top-[44px] right-[-60px] w-[250px] py-[7px] text-[14px] tracking-[0.14em] rotate-45",
  "lg-left":
    "top-[44px] left-[-60px] w-[250px] py-[7px] text-[14px] tracking-[0.14em] -rotate-45",
  "sm-right":
    "top-[12px] right-[-30px] w-[112px] py-[3px] text-[9px] tracking-[0.04em] rotate-45",
  "sm-left":
    "top-[12px] left-[-30px] w-[112px] py-[3px] text-[9px] tracking-[0.04em] -rotate-45",
};

export default function OfferRibbon({
  size = "lg",
  text = "Offer ends soon",
  position = "right",
}: {
  size?: "lg" | "sm";
  text?: string;
  position?: "left" | "right";
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bg-[#dc2626] text-center font-extrabold uppercase leading-none text-white shadow-[0_6px_20px_rgba(0,0,0,0.16)] ${PRESETS[`${size}-${position}`]}`}
    >
      {text}
    </span>
  );
}
