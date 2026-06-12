import CtaButton from "./CtaButton";

export default function Header() {
  return (
    <header className="sticky top-[var(--ruler)] z-50 flex items-center justify-between gap-5 border-b border-line bg-brand px-[var(--pad)] py-[clamp(14px,1.4vw,22px)]">
      <a href="#" aria-label="KayKav Academy" className="inline-flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kaykav-academy-logo.svg"
          alt="KayKav Academy"
          className="block h-[clamp(36px,3.2vw,50px)] w-auto"
        />
      </a>
      <CtaButton
        href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Now For Cohort 2.0
      </CtaButton>
    </header>
  );
}
