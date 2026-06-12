import Reveal from "./Reveal";
import RippleTiles from "./RippleTiles";

const ITEMS = [
  "Ship a real, production-ready MVP to a live URL in 4 weeks, not a demo, a working product",
  "Write the ProjectPort document that turns AI agents into disciplined engineers, the single file that keeps every Claude Code and Antigravity session on rails",
  "Run a two-agent workflow where Claude Code handles architecture and logic while Antigravity handles UI, and know exactly when to use which",
  "Build offline-first apps with IndexedDB, sync queues, and last-write-wins conflict resolution that actually hold up when internet drops",
  "Set up auth, Row Level Security, and Supabase sync without writing a backend API, the patterns that keep user data safe with just the JS client",
  "Design production-grade UIs without Figma, using Tailwind design tokens, dark mode with anti-flash, and a component system that doesn't look AI-generated",
].map((text, i) => ({ num: i + 1, text }));

export default function Learn() {
  return (
    <section className="border-t border-line px-[var(--pad)] pt-[clamp(44px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
      <h2 className="mb-[clamp(46px,7.8vw,112px)] text-[clamp(40px,9vw,130px)] font-extrabold leading-[0.92] tracking-[-0.025em]">
        <Reveal inline mask duration={0.7}>
          What you will learn
        </Reveal>
      </h2>

      <div className="mb-[clamp(56px,10vw,144px)] flex justify-end max-[720px]:justify-start">
        <Reveal delay={0.1} className="w-[66%] max-w-[950px] max-[720px]:w-full">
          <p className="text-[clamp(19px,2.5vw,36px)] font-bold leading-[1.33] tracking-[-0.01em]">
            Within 4 weeks, you&apos;ll learn the exact system I used to build and
            ship TailorTab, an offline-first PWA now used by real tailors in
            Nigeria. No engineering team. No design-to-code handoff tools. Just
            Claude Code, Antigravity, and a method that treats AI agents like
            brilliant junior engineers who need structure to do their best work.
          </p>
        </Reveal>
      </div>

      <div className="relative grid grid-cols-3 max-[720px]:grid-cols-1 before:absolute before:inset-x-[calc(-1*var(--pad))] before:top-0 before:h-px before:bg-line before:content-['']">
        {ITEMS.map((item, i) => (
          <div
            key={item.num}
            className={`group relative pt-[clamp(16px,1.4vw,24px)] pr-[clamp(18px,1.8vw,30px)] pb-[clamp(50px,6.4vw,96px)] after:absolute after:inset-x-[calc(-1*var(--pad))] after:bottom-0 after:h-px after:bg-line after:content-[''] ${
              (i + 1) % 3 === 0 ? "" : "border-r border-line"
            } ${
              i % 3 === 0 ? "pl-0" : "pl-[clamp(18px,1.8vw,30px)]"
            } max-[720px]:border-r-0 max-[720px]:pl-0`}
          >
            {/* clipping layer keeps the ripple inside the cell without
                cutting off the full-width pseudo-element borders; outer
                columns bleed through the page gutter like the hairlines do */}
            <span
              aria-hidden
              className={`absolute top-0 bottom-0 overflow-hidden ${
                i % 3 === 0 ? "left-[calc(-1*var(--pad))]" : "left-0"
              } ${
                (i + 1) % 3 === 0 ? "right-[calc(-1*var(--pad))]" : "right-0"
              } max-[720px]:left-[calc(-1*var(--pad))] max-[720px]:right-[calc(-1*var(--pad))]`}
            >
              <RippleTiles cols={16} rows={12} tileClass="bg-[#FDC97A]" />
            </span>
            <Reveal delay={(i % 3) * 0.05} y={40} className="relative z-10">
              <span className="mb-[clamp(20px,2.4vw,40px)] block text-[clamp(64px,9.2vw,138px)] font-extrabold leading-none tracking-[-0.03em] text-dim-deep transition-colors duration-300 group-hover:text-black">
                {item.num}
              </span>
              <p className="text-[clamp(15px,1.95vw,28px)] font-bold leading-[1.32] tracking-[-0.005em] text-white transition-colors duration-300 group-hover:text-black">
                {item.text}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
