"use client";
import React, { useEffect, useRef } from "react";

const PROJECTS = [
  { 
    id: 1, 
    title: "WEDDING PLANNER & IDEAS JOURNAL", 
    author: "ADESEWA OWOEYE", 
    desc: "An offline-first app that holds both the to-dos and the creative vision of a wedding in one place, syncing automatically when back online.",
    image: ""
  },
  { 
    id: 2, 
    title: "MYBABYLOG", 
    author: "AYOBAMI ADEREMI", 
    desc: "A shared, offline-first feeding, nappy, and sleep tracker that keeps two carers perfectly in sync on a baby's day — no constant texting.",
    image: ""
  },
  { 
    id: 3, 
    title: "BITEPLAN", 
    author: "JOHN TAIWO", 
    desc: "An offline-first meal assistant that decides what to cook from the ingredients you have, your mood, budget, and time — ending decision fatigue.",
    image: ""
  },
  { 
    id: 4, 
    title: "WANDAR", 
    author: "IVAR LOTHBROK", 
    desc: "A social platform for creating, discovering, and remixing detailed travel itineraries as interactive folders of places and recommendations.",
    image: ""
  },
  { 
    id: 5, 
    title: "PRECISION", 
    author: "ENIOLA ALEX", 
    desc: "A web app that manages every dermatology-clinic client from first booking to final follow-up — intake, treatment plans, and progress tracking.",
    image: ""
  },
  { 
    id: 6, 
    title: "DDT STRUCTURE", 
    author: "OLAOLUWA OBAFEMI", 
    desc: "A web tool for running non-destructive testing (NDT) labs — assigning tasks, tracking staff efficiency, and monitoring projects start to finish.",
    image: ""
  },
  { 
    id: 7, 
    title: "DRAFTDESK", 
    author: "MIDE", 
    desc: "An offline-first feedback and revision tracker that pulls scattered client notes from chats, email, and voice memos into one focused workspace.",
    image: ""
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run animations if user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fades = entry.target.querySelectorAll<HTMLElement>(".anim-fade");
            fades.forEach((el, i) => {
              setTimeout(() => { 
                el.style.opacity = "1"; 
                el.style.transform = "translateY(0)"; 
              }, i * 150);
            });

            const cards = entry.target.querySelectorAll<HTMLElement>(".project-card");
            cards.forEach((el, i) => {
              setTimeout(() => { 
                el.style.opacity = "1"; 
                el.style.transform = "translateY(0)"; 
              }, 300 + (i * 100));
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: "#141414", padding: "120px 30px", minHeight: "100vh", position: "relative" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div className="anim-fade" style={{ 
          marginBottom: "80px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease"
        }}>
          <div style={{
            background: "#D3A35C",
            color: "#111",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "24px",
            display: "inline-block"
          }}>
            Shipped in Cohort 01
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 300,
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textAlign: "center"
          }}>
            Student <span style={{ fontWeight: 800 }}>Projects</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "32px",
        }}>
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s ease, background 0.3s ease, opacity 0.6s ease",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                opacity: 0,
                transform: "translateY(30px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              {/* Image */}
              <div style={{
                width: "100%",
                aspectRatio: "16/10",
                background: "rgba(255, 255, 255, 0.02)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                overflow: "hidden"
              }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Project Image
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#fff", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                  Built by {project.author}
                </p>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginTop: "auto" }}>
                  {project.desc}
                </p>
              </div>
            </div>
          ))}

          {/* 8th CTA Card */}
          <div 
            className="project-card cta-project-card"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px dashed rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, background 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#D3A35C";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "#fff", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Your Project Belongs Here
            </h3>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", maxWidth: "400px", lineHeight: 1.6 }}>
              Don't just watch others build. Claim your spot in Cohort 2.0 and ship a real product in 4 weeks.
            </p>
            <a
              href="https://mainstack.com/ship-real-mvps-with-ai-agents-kaykav"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#D3A35C",
                color: "#000",
                height: "56px",
                padding: "0 32px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#D3A35C"}
            >
              Apply for Cohort 2.0
            </a>
          </div>
        </div>

      </div>
      <style>{`
        @media (min-width: 780px) {
          .cta-project-card {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>
  );
}
