"use client";

import { APPLY_HREF, PROMO_CODE } from "./nav";
import { useCopyCode } from "./useCopyCode";
// import OfferRibbon from "./OfferRibbon";

// bold gold bar fixed to the bottom. desktop only — on mobile the offer lives
// in the fixed apply bar instead (see MobileApplyBar).
export default function PromoBarBottom() {
  const { copied, copy } = useCopyCode();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden items-center justify-center gap-[clamp(16px,2vw,40px)] overflow-hidden border-t border-black/10 bg-white px-[var(--pad)] py-[clamp(10px,1vw,15px)] text-[#11253f] shadow-[0_-6px_24px_rgba(13,32,64,0.12)] min-[721px]:flex">
      <p className="text-[clamp(14px,1.3vw,17px)] font-bold tracking-[-0.005em]">
        Let Celebrate Father&apos;s Day: Get <span className="font-extrabold text-brand">20% off</span> with this code at checkout
      </p>

      <button
        type="button"
        onClick={copy}
        aria-label={`Copy code ${PROMO_CODE}`}
        className="inline-flex items-center gap-[6px] rounded-[2px] border-[1.5px] border-black/20 px-[clamp(12px,1.3vw,18px)] py-[clamp(7px,0.8vw,10px)] text-[clamp(13px,1.2vw,15px)] font-bold tracking-[0.04em] text-[#11253f] transition-[scale] duration-200 active:scale-[0.97]"
      >
        {copied ? (
          "Copied!"
        ) : (
          <>
            {PROMO_CODE}
            <svg viewBox="0 0 24 24" aria-hidden className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          </>
        )}
      </button>

      {/* <a
        href={APPLY_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[2px] bg-[#FDC97A] px-[clamp(16px,1.6vw,26px)] py-[clamp(8px,0.85vw,11px)] text-[clamp(13px,1.2vw,15px)] font-semibold text-black transition-[scale] duration-200 active:scale-[0.97]"
      >
        Apply for Cohort 2.0
      </a> */}

      {/* <OfferRibbon size="sm" text="Ends soon" /> */}
    </div>
  );
}
