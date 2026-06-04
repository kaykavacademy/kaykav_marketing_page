"use client";

const B = "1px solid #111";

const modules = [
  { index: "01", title: "The Problem with Prompting",  cat: "Foundation · Mindset",       desc: "Why AI-generated demos collapse under real usage — and the mental model shift that changes everything about how you build.", tags: ["Concepts","Mindset"],   bg: "#F7F4EE" },
  { index: "02", title: "Claude Code, Properly",        cat: "Tooling · Environment",       desc: "Get Claude Code configured the way professionals use it. Hooks, permissions, context management, and the settings 99% skip.", tags: ["Claude Code","Setup"], bg: "var(--bg-surface)" },
  { index: "03", title: "Antigravity Workflow",          cat: "Workflow · Architecture",     desc: "A structured, repeatable framework for building with AI that doesn't collapse under complexity. From blank repo to deployed product.", tags: ["Workflow","System"],    bg: "var(--bg-surface)" },
  { index: "04", title: "Shipping Something Real",       cat: "Capstone · Live Build",       desc: "Build a complete, production-ready MVP live. Auth, database, payments, deployment — nothing left out. You leave with a real product.", tags: ["Build","Ship"],        bg: "#F7F4EE" },
];

export default function Work() {
  return (
    <section id="course" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* Label row */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>The Curriculum</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>02 / What You&apos;ll Actually Learn</span>
        </div>
      </div>

      {/* Header cells */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "80px 56px 72px" }}>
          <h2 className="anim-lines" style={{ fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, color: "#111" }}>
            <span className="line-mask"><span className="line-inner">What you&apos;ll</span></span>
            <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic" }}>actually learn</span></span>
          </h2>
        </div>
        <div style={{ padding: "80px 56px 72px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p className="anim-fade" style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--fg-2)", fontWeight: 300, maxWidth: "400px" }}>
            Four modules. Each one builds on the last. You don&apos;t leave with notes — you leave with working code and a framework you&apos;ll use forever.
          </p>
          <a href="https://mainstack.com/c/kaykav" target="_blank" rel="noopener noreferrer"
            className="anim-fade"
            style={{ alignSelf: "flex-start", marginTop: "40px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", textDecoration: "none", borderBottom: "1px solid var(--border-light)", paddingBottom: "4px", transition: "color .2s, border-color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-2)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}>
            View Full Syllabus →
          </a>
        </div>
      </div>

      {/* Module grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {modules.map((mod, i) => (
          <ModuleCell key={i} mod={mod} pos={i} />
        ))}
      </div>

      {/* Stats */}
      <div className="anim-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B }}>
        {[
          { num: "4",    label: "Core Modules" },
          { num: "100%", label: "Production Focus" },
          { num: "1",    label: "Real MVP Shipped" },
          { num: "∞",    label: "Lifetime Access" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "48px 40px", borderRight: i < 3 ? B : "none" }}>
            <div style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1, marginBottom: "10px" }}>{s.num}</div>
            <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*="repeat(2, 1fr)"]{grid-template-columns:1fr!important}
          div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr 1fr!important}
          div[style*="1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}

function ModuleCell({ mod, pos }: { mod: typeof modules[0]; pos: number }) {
  return (
    <div
      className="hover-fill"
      style={{
        borderRight: pos % 2 === 0 ? B : "none",
        borderBottom: pos < 2 ? B : "none",
        padding: "56px 48px",
        background: mod.bg,
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.querySelectorAll<HTMLElement>("p,h3,span").forEach(el => el.style.color = "#fff");
        e.currentTarget.querySelectorAll<HTMLElement>("[data-tag]").forEach(el => { el.style.borderColor = "rgba(255,255,255,.25)"; el.style.color = "rgba(255,255,255,.7)"; });
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = mod.bg;
        e.currentTarget.querySelectorAll<HTMLElement>("p,h3,span").forEach(el => el.style.color = "");
        e.currentTarget.querySelectorAll<HTMLElement>("[data-tag]").forEach(el => { el.style.borderColor = ""; el.style.color = ""; });
      }}>
      <span style={{ position: "absolute", top: "16px", right: "28px", fontSize: "80px", fontWeight: 900, color: "rgba(0,0,0,.04)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none", pointerEvents: "none" }}>{mod.index}</span>

      <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "20px" }}>
        {mod.index} — {mod.cat}
      </p>
      <h3 style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#111", marginBottom: "18px" }}>
        {mod.title}
      </h3>
      <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--fg-2)", fontWeight: 300, maxWidth: "420px", marginBottom: "32px" }}>
        {mod.desc}
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {mod.tags.map(t => (
          <span data-tag key={t} style={{ padding: "5px 14px", border: B, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", transition: "all .2s" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
