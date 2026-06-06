import React from "react";

export default function Cta() {
  return (
    <section 
      style={{ 
        backgroundColor: "#F5F3EC", 
        padding: "clamp(120px, 15vw, 200px) 24px", 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
        <h2 
          style={{ 
            color: "#000", 
            fontSize: "clamp(48px, 8vw, 100px)", 
            fontWeight: 900, 
            lineHeight: 1, 
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            marginBottom: "32px"
          }}
        >
          Stop prompting.<br/>Start shipping.
        </h2>
        
        <p style={{ 
          fontSize: "clamp(18px, 2.5vw, 24px)", 
          color: "#333", 
          marginBottom: "64px", 
          lineHeight: 1.5,
          fontWeight: 400
        }}>
          By the end of Week 4, your MVP is live. You demo it. You have a case study. <br className="hidden-mobile" />
          You have a method you can apply to every project from here on.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <p style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 600, color: "#111", margin: 0 }}>
            $70 (NGN 90,000)
          </p>
          <a 
            href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav" 
            target="_blank" 
            rel="noopener noreferrer"
            className="final-cta-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2563EB",
              color: "#fff",
              padding: "24px 48px",
              textDecoration: "none",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              transition: "opacity 0.3s ease",
            }}
          >
            <span style={{ marginRight: "12px" }}>Apply Now For Cohort 2.0</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      <style>{`
        .final-cta-button:hover {
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
