"use client";

// ── Feature list ────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: <BookHeart />, label: "4 core modules" },
  { icon: <LaptopCode />, label: "Live build capstone" },
  { icon: <Users />,      label: "Community access" },
  { icon: <Sparkle />,   label: "AI skill Framework" },
];

import { DottedSurface } from "@/components/ui/dotted-surface";

export default function Enrol() {
  return (
    <section
      id="enrol"
      style={{ position: "relative", minHeight: "100vh", background: "#000", overflow: "hidden" }}
    >

      <DottedSurface />

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
      }}>

        {/* ── Centered text content ── */}
        <div
          className="enrol-col"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          {/* Headline */}
          <h2
            className="anim-lines"
            style={{
              fontSize: "clamp(32px, 5.2vw, 72px)",
              textTransform: "uppercase",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="line-mask">
              <span className="line-inner" style={{ display: "block", fontWeight: 400, color: "#fff" }}>
                Stop prompting.
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ display: "block", fontWeight: 800, color: "#fff" }}>
                Start building.
              </span>
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="anim-fade"
            style={{
              fontSize: "clamp(15px, 2.2vw, 36px)",
              fontWeight: 400,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.2,
              maxWidth: "min(684px, 100%)",
              marginTop: "clamp(20px, 4vh, 64px)",
            }}
          >
            Seats are limited each cohort. If you&apos;re serious about shipping
            production-grade products with AI — this is where you start.
          </p>

          {/* Features 2×2 grid */}
          <div
            className="anim-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "clamp(32px, 5vw, 80px)",
              rowGap: "clamp(14px, 2vh, 24px)",
              marginTop: "clamp(28px, 5vh, 60px)",
              maxWidth: "500px",
              width: "100%",
              textAlign: "left",
            }}
          >
            {FEATURES.map(({ icon, label }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {icon}
                <span style={{
                  fontSize: "clamp(12px, 1.3vw, 20px)",
                  fontWeight: 400,
                  color: "#fff",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom: CTA ─────────────────────────── */}
        <div style={{ position: "relative", flexShrink: 0, marginTop: "40px", display: "flex", justifyContent: "center" }}>
          {/* CTA — centred */}
          <div style={{
            zIndex: 2,
            marginTop: "60px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(14px, 1.5vw, 20px)", background: "rgba(255,255,255,0.1)", padding: "4px 16px", borderRadius: "100px", margin: 0 }}>
                $70 (NGN 90,000)
              </p>
              <a
                href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
                target="_blank"
                rel="noopener noreferrer"
                className="enrol-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "#d3a35c",
                  color: "#000",
                  height: "64px",
                  width: "clamp(240px, 28vw, 450px)",
                  fontSize: "clamp(13px, 1.4vw, 24px)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Apply now for cohort 2.0
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                  <path d="M18 13.3006C18 13.3006 31.8766 12.2152 33.8308 14.1693C35.7848 16.1233 34.6992 30 34.6992 30M33 15L13 35" stroke="#141B34" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`

        .enrol-cta {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .enrol-cta:hover {
          background-color: #295898 !important; /* switch to primary blue */
          color: #fff !important;
        }
        .enrol-cta svg path {
          transition: stroke 0.3s ease;
        }
        .enrol-cta:hover svg path {
          stroke: #fff !important;
        }

      `}</style>
    </section>
  );
}

/* ── Icon components ──────────────────────────────────────────────────────── */

function BookHeart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M21 17V16H22V2H21V1H4V2H3V3H2V21H3V22H4V23H21V22H22V21H21V20H20V17H21ZM18 21H6V20H5V18H6V17H18V21ZM18 9H17V10H16V11H15V12H14V13H13V14H12V13H11V12H10V11H9V10H8V9H7V6H8V5H11V6H12V7H13V6H14V5H17V6H18V9Z" fill="white"/>
    </svg>
  );
}

function LaptopCode() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 14V5H4V4H20V5H21V14H19V6H5V14H3Z" fill="white"/>
      <path d="M10 11H11V13H10V12H9V11H8V9H9V8H10V7H11V9H10V11Z" fill="white"/>
      <path d="M14 9H13V7H14V8H15V9H16V11H15V12H14V13H13V11H14V9Z" fill="white"/>
      <path d="M1 15V18H2V19H3V20H21V19H22V18H23V15H1ZM3 18V17H21V18H3Z" fill="white"/>
    </svg>
  );
}

function Users() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 13V12H1V10H2V9H7V12H8V13H2Z" fill="white"/>
      <path d="M5 7H4V5H5V4H7V5H8V6H7V8H5V7Z" fill="white"/>
      <path d="M8 7H9V6H10V5H14V6H15V7H16V11H15V12H14V13H10V12H9V11H8V7Z" fill="white"/>
      <path d="M19 18H20V21H19V22H5V21H4V18H5V17H6V16H8V15H16V16H18V17H19V18Z" fill="white"/>
      <path d="M23 10V12H22V13H16V12H17V9H22V10H23Z" fill="white"/>
      <path d="M17 6H16V5H17V4H19V5H20V7H19V8H17V6Z" fill="white"/>
    </svg>
  );
}

function Sparkle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M13 16H14V18H13V20H12V22H11V23H9V22H8V21H7V20H6V19H5V17H6V16H7V14H6V15H5V16H4V17H3V16H2V15H1V13H2V12H4V11H6V10H8V11H9V12H10V13H11V14H12V15H13V16Z" fill="white"/>
      <path d="M23 1V3H22V4H21V5H20V6H19V7H18V8H17V9H16V11H17V13H16V14H14V13H13V12H12V11H11V10H10V8H11V7H13V8H15V7H16V6H17V5H18V4H19V3H20V2H21V1H23Z" fill="white"/>
    </svg>
  );
}
