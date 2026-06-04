"use client";

const B = "1px solid #111";

const modules = [
  { n: "01", title: "The Problem with Prompting",  body: "Why AI-generated demos collapse under real usage — and the mental model shift that changes everything." },
  { n: "02", title: "Claude Code, Properly",        body: "Hooks, context management, permissions, multi-file edits. The configuration that 99% of tutorials skip." },
  { n: "03", title: "Antigravity Workflow",          body: "A structured, repeatable build framework that doesn't collapse under complexity. From blank repo to deployed product." },
  { n: "04", title: "Shipping Something Real",       body: "Build a complete MVP live. Auth, database, payments, deployment — nothing left out. You leave with a real product." },
];

const outcomes = [
  { title: "1 deployed MVP",          sub: "Not a demo. A product with real users." },
  { title: "Claude Code mastery",     sub: "The tool configured, not just opened." },
  { title: "A repeatable framework",  sub: "Use it on every project after this." },
  { title: "Systems thinking",        sub: "Decompose any product, build it precisely." },
];

export default function Course() {
  return (
    <section id="course" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* ── Section label ── */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>The Course</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>02 / Curriculum &amp; Outcomes</span>
        </div>
      </div>

      {/* ── Heading row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "80px 56px 72px" }}>
          <h2 className="anim-lines" style={{
            fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 900,
            letterSpacing: "-0.03em", lineHeight: 0.92, color: "#111",
          }}>
            <span className="line-mask"><span className="line-inner">What you</span></span>
            <span className="line-mask"><span className="line-inner">learn.</span></span>
            <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic", color: "var(--fg-2)" }}>What you keep.</span></span>
          </h2>
        </div>
        <div style={{ padding: "80px 56px 72px" }}>
          <p className="anim-fade" style={{
            fontSize: "17px", lineHeight: 1.8, color: "var(--fg-2)",
            fontWeight: 300, maxWidth: "420px",
          }}>
            Four modules, each building on the last. Every concept taught through building something real — not slides, not theory, not notes you&apos;ll never revisit.
          </p>
        </div>
      </div>

      {/* ── Modules list ── */}
      <div style={{ borderBottom: B }}>
        {modules.map((mod, i) => (
          <ModuleRow key={i} mod={mod} last={i === modules.length - 1} />
        ))}
      </div>

      {/* ── Outcomes ── */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "56px 28px 48px", display: "flex", alignItems: "flex-start" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", paddingTop: "4px" }}>You Walk Away With</span>
        </div>
        <div className="anim-stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
          {outcomes.map((o, i) => (
            <div key={i} style={{
              padding: "40px 40px",
              borderRight: i % 2 === 0 ? B : "none",
              borderBottom: i < 2 ? B : "none",
            }}>
              <p style={{ fontSize: "clamp(15px, 1.6vw, 19px)", fontWeight: 700, color: "#111", marginBottom: "6px", letterSpacing: "-0.01em" }}>{o.title}</p>
              <p style={{ fontSize: "13px", color: "var(--fg-2)", fontWeight: 300, lineHeight: 1.6 }}>{o.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*="1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="200px 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}

function ModuleRow({ mod, last }: { mod: typeof modules[0]; last: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr 1fr",
        borderBottom: last ? "none" : "1px solid #111",
        transition: "background .3s",
        background: "#F7F4EE",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--accent)";
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("p, span").forEach(el => el.style.color = "#fff");
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "#F7F4EE";
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("p, span").forEach(el => el.style.color = "");
      }}
    >
      <div style={{ borderRight: B, padding: "36px 28px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--fg-3)", fontWeight: 500 }}>{mod.n}</span>
      </div>
      <div style={{ borderRight: B, padding: "36px 40px", display: "flex", alignItems: "center" }}>
        <p style={{ fontSize: "clamp(16px, 1.8vw, 22px)", fontWeight: 700, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{mod.title}</p>
      </div>
      <div style={{ padding: "36px 40px", display: "flex", alignItems: "center" }}>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--fg-2)", fontWeight: 300, maxWidth: "360px" }}>{mod.body}</p>
      </div>
    </div>
  );
}
