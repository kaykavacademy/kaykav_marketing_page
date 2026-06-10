import React from "react";
import Image from "next/image";

const learningPoints = [
  "Ship a real, production-ready MVP to a live URL in 4 weeks, not a demo, a working product",
  "Write the ProjectPort document that turns AI agents into disciplined engineers, the single file that keeps every Claude Code and Antigravity session on rails",
  "Run a two-agent workflow where Claude Code handles architecture and logic while Antigravity handles UI, and know exactly when to use which",
  "Build offline-first apps with IndexedDB, sync queues, and last-write-wins conflict resolution that actually hold up when internet drops",
  "Set up auth, Row Level Security, and Supabase sync without writing a backend API, the patterns that keep user data safe with just the JS client",
  "Design production-grade UIs without Figma, using Tailwind design tokens, dark mode with anti-flash, and a component system that doesn't look AI-generated",
  "Debug with AI instead of against it, turn cryptic errors into structured prompts that fix root causes, not symptoms"
];

export default function Course() {
  return (
    <section 
      id="course" 
      style={{ 
        position: "relative", 
        minHeight: "100vh", 
        background: "#fff", 
        overflow: "hidden", 
        padding: "clamp(80px, 10vw, 140px) 30px" 
      }}
    >
      {/* Background texture */}
      <div style={{
        position: "absolute",
        top: "-45px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "120%",
        height: "115%",
        pointerEvents: "none",
        userSelect: "none",
        opacity: 0.9,
        zIndex: 0,
      }}>
        <Image
          src="/section1-bg.png"
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Intro Section */}
        <div style={{ maxWidth: "900px", marginBottom: "clamp(80px, 12vw, 120px)" }}>
          <h2 style={{ 
            fontSize: "clamp(40px, 5.2vw, 72px)", 
            color: "#000", 
            textTransform: "uppercase", 
            lineHeight: 1.1, 
            letterSpacing: "-0.02em",
            fontWeight: 800,
            marginBottom: "40px"
          }}>
            Build a real product.<br/>Not just a demo.
          </h2>
          <div style={{ 
            fontSize: "clamp(18px, 2.2vw, 24px)", 
            lineHeight: 1.5, 
            color: "#111", 
            display: "flex", 
            flexDirection: "column", 
            gap: "24px",
            fontWeight: 400
          }}>
            <p>
              Over 4 weeks, you'll learn the exact system I used to build and ship TailorTab — an offline-first PWA now used by real tailors in Nigeria. No engineering team. No design-to-code handoff tools. Just Claude Code, Antigravity, and a method that treats AI agents like brilliant junior engineers who need structure to do their best work.
            </p>
            <p>
              You won't just watch me build. You'll ship your own MVP alongside me — week by week, screen by screen, deployed to a real URL by the end.
            </p>
          </div>
        </div>

        {/* What you will learn - Grid matching the screenshot */}
        <div style={{ marginBottom: "clamp(80px, 12vw, 120px)" }}>
          <h3 style={{ 
            fontSize: "clamp(28px, 3.5vw, 40px)", 
            fontWeight: 700, 
            marginBottom: "56px", 
            letterSpacing: "-0.01em",
            color: "#111"
          }}>
            What you will learn
          </h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "48px 80px" 
          }}>
            {learningPoints.map((point, index) => (
              <div key={index} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#333" strokeWidth="1"/>
                    <path d="M8 12.5L10.5 15L16 9" stroke="#333" strokeWidth="1.2"/>
                  </svg>
                </div>
                <p style={{ fontSize: "18px", lineHeight: 1.5, color: "#222", margin: 0 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for & Format */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "60px 80px", 
          marginBottom: "clamp(80px, 12vw, 120px)",
          paddingTop: "80px",
          borderTop: "1px solid rgba(0,0,0,0.1)"
        }}>
          <div>
            <h3 style={{ fontSize: "clamp(24px, 2.5vw, 28px)", fontWeight: 700, marginBottom: "32px", color: "#111" }}>Who this is for</h3>
            <div style={{ fontSize: "18px", lineHeight: 1.6, color: "#222", display: "flex", flexDirection: "column", gap: "20px" }}>
              <p>
                Founders who are tired of waiting on developers. Designers who are tired of handing off. Anyone who has watched AI tools ship impressive demos but struggled to turn those demos into something a real user would trust.
              </p>
              <p>
                You don't need to be a senior engineer. You do need to be willing to think architecturally — and this course will teach you how.
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "clamp(24px, 2.5vw, 28px)", fontWeight: 700, marginBottom: "32px", color: "#111" }}>Format</h3>
            <ul style={{ 
              fontSize: "18px", 
              lineHeight: 1.6, 
              color: "#222", 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px", 
              listStyle: "none", 
              padding: 0,
              margin: 0
            }}>
              <li style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>•</span>
                4 live sessions, 3 hours each, across 4 weeks
              </li>
              <li style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>•</span>
                Mix of concept teaching, live coding, and cohort Q&A
              </li>
              <li style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>•</span>
                Weekly build homework with a deployed deliverable
              </li>
              <li style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>•</span>
                Recordings, templates, and reference repo included
              </li>
              <li style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2563EB", fontWeight: "bold" }}>•</span>
                Limited cohort size for personal code review access
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      <style>{`
        .course-cta-button:hover {
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
