"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const B = "1px solid #111";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "grid", gridTemplateColumns: "1fr auto auto",
        background: scrolled ? "rgba(247,244,238,.95)" : "#F7F4EE",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: B, transition: "background .3s",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 32px", display: "flex", alignItems: "center" }}>
          <a href="#" aria-label="KayKav">
            <Image src="/logo.svg" alt="KayKav" width={110} height={36}
              loading="eager" priority style={{ height: "22px", width: "auto" }} />
          </a>
        </div>

        {/* Nav links — desktop */}
        <div style={{ borderLeft: B, borderRight: B, display: "flex", alignItems: "stretch" }} className="nav-d">
          {[["Course", "#course"], ["Outcomes", "#enrol"]].map(([lbl, href]) => (
            <a key={lbl} href={href} className="nav-link"
              style={{
                display: "flex", alignItems: "center",
                padding: "20px 28px", borderRight: B,
                fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#111", textDecoration: "none", fontWeight: 500,
                transition: "background .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-surface)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              {lbl}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="https://mainstack.com/c/kaykav" target="_blank" rel="noopener noreferrer"
          data-hover className="nav-d"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "20px 32px", background: "var(--accent)", color: "#fff",
            fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontWeight: 700, textDecoration: "none", transition: "background .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; }}>
          Enrol Now
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H4M9 1V6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} aria-label="Menu"
          className="nav-m"
          style={{ background: "none", border: "none", borderLeft: B, padding: "20px 24px", display: "none", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}>
          <span style={{ display: "block", width: "22px", height: "1px", background: "#111", transition: "all .3s", transform: open ? "rotate(45deg) translateY(6px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "#111", opacity: open ? 0 : 1, transition: "all .3s" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "#111", transition: "all .3s", transform: open ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      </nav>

      {open && (
        <div style={{ position: "fixed", inset: 0, background: "#F7F4EE", zIndex: 99, display: "flex", flexDirection: "column", paddingTop: "63px" }}>
          {[["Course", "#course"], ["Outcomes", "#enrol"], ["Enrol Now", "https://mainstack.com/c/kaykav"]].map(([lbl, href]) => (
            <a key={lbl} href={href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "28px 32px", borderBottom: B, fontSize: "clamp(24px, 7vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", textDecoration: "none" }}>
              {lbl}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .nav-d{display:none!important}
          .nav-m{display:flex!important}
        }
      `}</style>
    </>
  );
}
