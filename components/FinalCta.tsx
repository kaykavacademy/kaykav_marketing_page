import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section className="border-t border-line px-[var(--pad)] pt-[clamp(50px,6vw,96px)] pb-[clamp(54px,6.4vw,104px)] text-center">
      <h2 className="text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.98] tracking-[-0.02em]">
        <Reveal inline mask duration={0.7}>
          Stop prompting.
        </Reveal>
        <Reveal inline mask duration={0.7} delay={0.08}>
          Start shipping.
        </Reveal>
      </h2>
      {/* full-width banner button with an arrow-to-bar glyph */}
      <Reveal delay={0.15}>
        <CtaButton
          href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
          target="_blank"
          rel="noopener noreferrer"
          size="banner"
          className="mt-[clamp(28px,3.2vw,52px)]"
        >
          Apply for Cohort 2.0
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="size-[1em]"
          >
            <path d="M3 12h12" />
            <path d="M9 6l6 6-6 6" />
            <path d="M20 5v14" />
          </svg>
        </CtaButton>
      </Reveal>
    </section>
  );
}
