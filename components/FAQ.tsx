"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

type Item = { q: string; a: string };

const FAQS: Item[] = [
  {
    q: "Do I need coding experience?",
    a: "No. You direct AI agents to write the code; your job is to think clearly and make decisions. If you can use a computer and follow a system, you can ship.",
  },
  {
    q: "How long is the cohort?",
    a: "Four weeks. By the end you have a real, deployed MVP on a live URL, not a slide deck or a demo.",
  },
  {
    q: "What tools will I learn?",
    a: "Claude Code for architecture and logic, Google Antigravity for UI, and Supabase for auth and data. You will know exactly when to reach for each one.",
  },
  {
    q: "What if I miss a live session?",
    a: "Every session is recorded and yours to keep, along with the templates, prompts, and ProjectPort documents we build together.",
  },
  {
    q: "Is there support after the sessions?",
    a: "Yes. You join a community of builders pushing each other forward, and you keep access to future course updates.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. You leave with a certificate of completion and, more valuable, a shipped product in your portfolio.",
  },
];

// plus that becomes a minus: the vertical bar collapses when open
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative block h-[clamp(20px,1.8vw,30px)] w-[clamp(20px,1.8vw,30px)] shrink-0"
    >
      <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-white" />
      <span
        className={`absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

export default function FAQ() {
  // single-open accordion; first item open so the section reads on arrival
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faqs"
      className="border-t border-line px-[var(--pad)] pt-[var(--section-pt)] pb-[var(--section-pb)]"
    >
      <div className="grid grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,6vw,120px)] max-[860px]:grid-cols-1 max-[860px]:gap-[clamp(32px,8vw,56px)]">
        {/* smaller cap than the other headings: "Questions" is one unbreakable
            word and would otherwise outgrow its grid column and get clipped by
            the reveal mask. this keeps it inside the column with breathing room */}
        <h2 className="text-[clamp(40px,6.8vw,104px)] font-extrabold leading-[0.92] tracking-[-0.025em]">
          <Reveal inline mask duration={0.7}>
            Questions
          </Reveal>
        </h2>

        <ul className="border-t border-line">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full cursor-pointer appearance-none items-center justify-between gap-[clamp(16px,2vw,40px)] border-0 bg-transparent py-[clamp(20px,2.4vw,38px)] text-left"
                >
                  <span className="text-[clamp(18px,1.8vw,30px)] font-bold leading-[1.2] tracking-[-0.01em] text-white transition-opacity duration-200 group-hover:opacity-80">
                    {item.q}
                  </span>
                  <PlusMinus open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[64ch] pb-[clamp(20px,2.4vw,38px)] text-[clamp(15px,1.3vw,22px)] font-medium leading-[1.5] text-white/90">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
