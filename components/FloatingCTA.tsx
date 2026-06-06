"use client";
import React, { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctas = document.querySelectorAll(".hero-cta, .course-cta-button, .enrol-cta, .testi-cta, .final-cta-button");
    const visibleCTAs = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleCTAs.add(entry.target);
          } else {
            visibleCTAs.delete(entry.target);
          }
        });
        
        // Show floating CTA ONLY if no native CTAs are in viewport
        setIsVisible(visibleCTAs.size === 0);
      },
      { threshold: 0 } 
    );

    ctas.forEach(cta => observer.observe(cta));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        className="floating-cta-wrapper"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "0",
          right: "0",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          pointerEvents: isVisible ? "auto" : "none",
          transform: isVisible ? "translateY(0)" : "translateY(150%)",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          padding: "0 24px"
        }}
      >
        <a 
          href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "#2563EB",
            color: "#fff",
            height: "56px",
            width: "100%",
            maxWidth: "400px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "50px",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
          }}
        >
          Apply Now For Cohort 2.0
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <style>{`
        /* Hide completely on desktop */
        @media (min-width: 769px) {
          .floating-cta-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
