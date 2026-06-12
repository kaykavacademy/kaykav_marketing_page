import FooterClock from "./FooterClock";
import Reveal from "./Reveal";

const CELL =
  "flex items-center whitespace-nowrap border-r border-line px-[clamp(22px,2.4vw,44px)] py-[clamp(22px,2.2vw,38px)] text-[clamp(11px,0.95vw,15px)] font-extrabold uppercase tracking-[0.06em] text-white max-[720px]:whitespace-normal max-[720px]:border-r-0 max-[720px]:border-b max-[720px]:px-[var(--pad)]";

export default function Footer() {
  return (
    <Reveal y={18} duration={0.7}>
    <footer className="grid grid-cols-[auto_1fr_auto_auto] items-stretch border-t border-line max-[720px]:grid-cols-1">
      <div className={`${CELL} pl-[var(--pad)] pr-[clamp(26px,3vw,56px)] max-[720px]:pr-[var(--pad)]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kaykav-academy-logo.svg"
          alt="KayKav. Academy"
          className="block h-[clamp(34px,2.9vw,45px)] w-auto"
        />
      </div>
      <div className={CELL}>© 2026 KayKav Academy. All rights reserved.</div>
      <div className={CELL}>Built, not prompted.</div>
      <div className={`${CELL} gap-[0.5em] border-r-0 pr-[var(--pad)] max-[720px]:border-b-0`}>
        <FooterClock /> GMT+1
      </div>
    </footer>
    </Reveal>
  );
}
