"use client";
import { useEffect, useRef } from "react";

function ProductShowcase() {
  return (
    <div className="showcase-container hl-fade" style={{ position: "relative", width: "100%", maxWidth: "560px", margin: "0 auto", marginTop: "20px" }}>
      {/* Pill Label */}
      <div style={{
        position: "absolute",
        top: "-24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#D3A35C", // Gold accent
        color: "#111", // Dark text
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        zIndex: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        Shipped in Cohort 01
      </div>

      {/* Browser Mockup */}
      <div style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
        aspectRatio: "16/10",
        transform: "perspective(1000px) rotateY(-5deg) rotateX(2deg)",
        zIndex: 1,
      }}>
        {/* Browser Top Bar */}
        <div style={{ background: "rgba(255, 255, 255, 0.1)", height: "32px", display: "flex", alignItems: "center", padding: "0 12px", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        </div>
        {/* Placeholder Area */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 32px)", color: "rgba(255,255,255,0.4)", fontSize: "14px", textTransform: "uppercase", textAlign: "center", padding: "20px" }}>
          [Desktop Screenshot Placeholder]
        </div>
      </div>

      {/* Phone Mockup */}
      <div style={{
        position: "absolute",
        bottom: "-30px",
        right: "-20px",
        width: "32%",
        aspectRatio: "9/19",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
        transform: "perspective(1000px) rotateY(-12deg) rotateX(4deg)",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", textAlign: "center", padding: "10px" }}>
          [Mobile Screenshot]
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run animations if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lines = ref.current?.querySelectorAll<HTMLElement>(".hl-inner");
    lines?.forEach((el, i) => {
      setTimeout(() => { el.style.transform = "translateY(0)"; }, 80 + i * 160);
    });
    
    const fades = ref.current?.querySelectorAll<HTMLElement>(".hl-fade");
    fades?.forEach((el, i) => {
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 450 + i * 120);
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#295898",
        overflow: "hidden",
        paddingTop: "108px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Blob overlay — mix-blend-screen */}
      <img
        src="/bg-blob.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: "-45px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "115%",
          objectFit: "cover",
          mixBlendMode: "screen",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Main Content Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          alignItems: "center",
          gap: "clamp(40px, 6vw, 80px)",
          padding: "clamp(40px, 6vh, 80px) 30px",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(42px, 5.5vw, 88px)",
            fontWeight: 300,
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px"
          }}>
            {["Built, Not", "Prompted."].map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: 1.15 }}>
                <span
                  className="hl-inner"
                  style={{
                    display: "block",
                    transform: "translateY(110%)",
                    transition: `transform 0.95s cubic-bezier(.16,1,.3,1) ${i * 0.14}s`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <h2
            className="hl-fade"
            style={{
              fontSize: "clamp(20px, 2.5vw, 32px)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: "24px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            Ship a real, deployed MVP with AI agents — in four weeks.
          </h2>

          {/* Paragraph */}
          <p
            className="hl-fade"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              marginBottom: "48px",
              maxWidth: "640px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            Every AI tool promises an app from a single sentence. You've watched
            the demo dazzle — then crater the moment a real user touches it. This
            cohort is the opposite: a guided two-agent build loop (Claude for logic,
            Antigravity for UI) that takes you from idea to a product that actually ships.
          </p>

          {/* CTA Group */}
          <div 
            className="hl-fade cta-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            <a
              href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                color: "#000",
                height: "60px",
                padding: "0 32px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Apply for Cohort 02
              <span className="cta-arrow" style={{ color: "#D3A35C", fontSize: "20px", marginLeft: "10px", transition: "color 0.3s" }}>→</span>
            </a>

            <a
              href="#course"
              className="ghost-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "rgba(255,255,255,0.7)",
                fontSize: "16px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              Course details ↓
            </a>
          </div>
        </div>

        {/* Right Column: Product Showcase */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProductShowcase />
        </div>
      </div>

      {/* Proof & Logistics Bar */}
      <div
        className="hl-fade proof-bar"
        style={{
          marginTop: "auto",
          width: "100%",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.15)",
          padding: "24px 30px",
          position: "relative",
          zIndex: 1,
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}
      >
        <div style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
          fontSize: "14px",
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
        className="proof-inner"
        >
          <div>
            [X] products shipped &nbsp;·&nbsp; [X] builders graduated &nbsp;·&nbsp; [X] countries
          </div>
          <div style={{ color: "#fff", fontWeight: 600 }}>
            4 Weeks &nbsp;·&nbsp; Live &nbsp;·&nbsp; Demo Day &nbsp;·&nbsp; Starts [Date]
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: clamp(30px, 5vh, 60px) !important;
          }
          .cta-group {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .primary-cta {
            width: 100%;
          }
          .proof-inner {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }

        .primary-cta:hover {
          background-color: #D3A35C !important;
          color: #fff !important;
        }
        .primary-cta:hover .cta-arrow {
          color: #fff !important;
        }

        .ghost-cta:hover {
          color: #fff !important;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hl-inner, .hl-fade {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
