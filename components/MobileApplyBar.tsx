import { APPLY_HREF } from "./nav";

// persistent apply CTA pinned to the bottom on mobile only; the page reserves
// space for it via --mobile-cta-h so it never hides the footer.
export default function MobileApplyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-line bg-brand px-[var(--pad)] pt-[clamp(10px,3vw,16px)] pb-[calc(env(safe-area-inset-bottom)+clamp(10px,3vw,16px))] max-[720px]:block">
      <a
        href={APPLY_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[clamp(54px,15vw,64px)] w-full items-center justify-center rounded-[2px] bg-[#FDC97A] px-6 text-center text-[16px] font-semibold text-black transition-[scale] duration-200 active:scale-[0.98]"
      >
        Apply for Cohort 2.0
      </a>
    </div>
  );
}
