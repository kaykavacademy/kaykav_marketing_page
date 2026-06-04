"use client";
import { useEffect, useRef } from "react";

const B = "1px solid #111";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Stagger headline lines in on load
    ref.current?.querySelectorAll<HTMLElement>(".h-line").forEach((el, i) => {
      setTimeout(() => {
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, 80 + i * 130);
    });
    ref.current?.querySelectorAll<HTMLElement>(".h-fade").forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 560 + i * 90);
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        paddingTop: "65px",
        minHeight: "100svh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "#F7F4EE",
        borderBottom: B,
      }}
    >
      {/* ── Main body ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        borderBottom: B,
      }}>

        {/* Left — headline */}
        <div style={{
          borderRight: B,
          padding: "80px 56px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          {/* Eyebrow */}
          <p className="h-fade" style={{
            fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--fg-3)", fontWeight: 400,
            opacity: 0, transform: "translateY(8px)", transition: "all .5s ease",
            marginBottom: "40px",
          }}>
            KayKav Academy — AI · Build · Ship
          </p>

          {/* Display type */}
          <div>
            {[
              { text: "Built,",    w: 900, color: "#111",          italic: false },
              { text: "Not",       w: 200, color: "#111",          italic: true  },
              { text: "Prompted.", w: 900, color: "var(--accent)", italic: false },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <div className="h-line" style={{
                  fontSize: "clamp(72px, 12vw, 190px)",
                  fontWeight: line.w,
                  color: line.color,
                  fontStyle: line.italic ? "italic" : "normal",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  transform: "translateY(110%)",
                  opacity: 0,
                  transition: "all 1s cubic-bezier(.16,1,.3,1)",
                }}>
                  {line.text}
                </div>
              </div>
            ))}
          </div>

          {/* Descriptor + CTA */}
          <div style={{ paddingTop: "64px", display: "flex", flexDirection: "column", gap: "32px" }}>
            <p className="h-fade" style={{
              fontSize: "17px", lineHeight: 1.75, color: "var(--fg-2)",
              fontWeight: 300, maxWidth: "480px",
              opacity: 0, transform: "translateY(12px)", transition: "all .7s ease",
            }}>
              AI coding tools promised you could build apps by describing them.
              You tried it. You got a demo that broke the moment someone actually used it.{" "}
              <span style={{ color: "#111", fontWeight: 500 }}>This is different.</span>
            </p>

            <div className="h-fade" style={{
              display: "flex", gap: "12px",
              opacity: 0, transform: "translateY(12px)", transition: "all .7s ease .08s",
            }}>
              <a href="https://mainstack.com/c/kaykav" target="_blank" rel="noopener noreferrer"
                data-hover
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "15px 32px", background: "var(--accent)", color: "#fff",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", textDecoration: "none",
                  transition: "background .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; }}>
                Enrol Now
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 10L10 1M10 1H4.5M10 1V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="#course" data-hover
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "15px 32px", border: B, color: "#111",
                  fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em",
                  textTransform: "uppercase", textDecoration: "none",
                  transition: "background .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-surface)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                See Course
              </a>
            </div>
          </div>
        </div>

        {/* Right — metadata stacked */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MetaCell label="Status" border="bottom">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3CA35C", flexShrink: 0, animation: "blink 2.4s ease-in-out infinite" }} />
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>Enrolment Open</span>
            </div>
          </MetaCell>

          <MetaCell label="Course" border="bottom" bg="var(--bg-surface)">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#111", lineHeight: 1.4 }}>
              Production MVPs with Claude Code
            </p>
            <p style={{ fontSize: "13px", color: "var(--fg-2)", marginTop: "6px", fontWeight: 300 }}>+ Antigravity Workflow</p>
          </MetaCell>

          <MetaCell label="You'll ship" border="bottom">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent)", lineHeight: 1.3 }}>
              1 production-ready MVP
            </p>
            <p style={{ fontSize: "13px", color: "var(--fg-2)", marginTop: "4px", fontWeight: 300 }}>on day one after the course</p>
          </MetaCell>

          {/* Accent fill — visual anchor */}
          <div style={{
            flex: 1, minHeight: "160px",
            background: "var(--accent)",
            display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
            padding: "24px 28px",
          }}>
            <span style={{
              fontSize: "clamp(64px, 8vw, 110px)", fontWeight: 900,
              color: "rgba(255,255,255,.1)", lineHeight: 1,
              letterSpacing: "-0.04em", userSelect: "none",
            }}>01</span>
          </div>
        </div>
      </div>

      {/* ── Bottom meta bar ── */}
      <div className="anim-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { label: "Format",  value: "Self-paced · Lifetime access" },
          { label: "Modules", value: "4 core + live capstone" },
          { label: "Output",  value: "1 real MVP shipped" },
          { label: "Tool",    value: "Claude Code + Antigravity" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "24px 32px", borderRight: i < 3 ? B : "none" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "6px" }}>{item.label}</p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        @media(max-width:900px){
          div[style*="1fr 340px"]{grid-template-columns:1fr!important}
          div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr 1fr!important}
        }
      `}</style>
    </section>
  );
}

function MetaCell({ label, children, border, bg }: {
  label: string; children: React.ReactNode;
  border?: "bottom"; bg?: string;
}) {
  return (
    <div style={{
      padding: "28px 32px",
      borderBottom: border === "bottom" ? "1px solid #111" : "none",
      background: bg ?? "transparent",
    }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "10px" }}>{label}</p>
      {children}
    </div>
  );
}
