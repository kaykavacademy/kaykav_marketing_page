import CtaButton from "./CtaButton";
import HeroVideoCard from "./HeroVideoCard";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative px-[var(--pad)] pt-[clamp(24px,4vw,64px)] pb-[var(--section-pb)]">
      <h1 className="ml-[-0.01em] text-[clamp(58px,13.2vw,204px)] font-extrabold leading-[0.86] tracking-[-0.025em]">
        <Reveal inline mask immediate duration={0.7}>
          Built, not
        </Reveal>
        <Reveal inline mask immediate duration={0.7} delay={0.08}>
          prompted
        </Reveal>
      </h1>

      <Reveal immediate delay={0.15}>
        <p className="mt-[clamp(30px,3.8vw,62px)] text-[clamp(18px,2vw,32px)] font-medium text-white">
          Ship a real, deployed MVP with AI agents in four weeks.
        </p>
      </Reveal>

      <Reveal immediate delay={0.22} className="mt-[clamp(28px,3.4vw,56px)] flex flex-wrap gap-[14px]">
        <CtaButton
          href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
          target="_blank"
          rel="noopener noreferrer"
          size="hero"
        >
          Apply for Cohort 2.0
        </CtaButton>
      </Reveal>

      {/* video card — bottom right, opens the full trailer */}
      <HeroVideoCard />
    </section>
  );
}
