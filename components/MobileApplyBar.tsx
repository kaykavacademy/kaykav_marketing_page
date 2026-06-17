"use client";

import { APPLY_HREF, PROMO_CODE } from "./nav";
import { useCopyCode } from "./useCopyCode";

// the fixed bottom bar on mobile: the 10% offer + copyable code on top, the
// persistent apply CTA below. (the page reserves space for it in globals.css.)
export default function MobileApplyBar() {
  const { copied, copy } = useCopyCode();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-black/10 bg-white px-[var(--pad)] pt-[clamp(9px,2.6vw,13px)] pb-[calc(env(safe-area-inset-bottom)+clamp(9px,2.6vw,13px))] shadow-[0_-6px_24px_rgba(13,32,64,0.12)] max-[720px]:block">
      {/* offer line */}
      <div className="mb-[10px] flex items-center justify-center gap-[10px] text-[13px] font-semibold text-[#11253f]">
        <span>
          Get <span className="font-extrabold text-brand">10% off</span> with
          code
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy code ${PROMO_CODE}`}
          className="inline-flex items-center gap-[5px] rounded-[2px] border border-black/20 px-[10px] py-[5px] text-[12px] font-bold tracking-[0.04em] text-[#11253f] transition-[scale] duration-200 active:scale-[0.96]"
        >
          {copied ? (
            "Copied!"
          ) : (
            <>
              {PROMO_CODE}
              <svg viewBox="0 0 24 24" aria-hidden className="h-[13px] w-[13px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            </>
          )}
        </button>
      </div>

      <a
        href={APPLY_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[clamp(52px,14vw,60px)] w-full items-center justify-center rounded-[2px] bg-[#FDC97A] px-6 text-center text-[16px] font-semibold text-black transition-[scale] duration-200 active:scale-[0.98]"
      >
        Apply for Cohort 2.0
      </a>
    </div>
  );
}
