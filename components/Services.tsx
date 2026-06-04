"use client";

const B = "1px solid #111";

const outcomes = [
  { title: "Ship a Real MVP",           desc: "Not a Figma file. Not a demo. A deployed, working product you can put in front of users on day one.",                                             tags: ["Deployed","Full-Stack","Production"], bg: "#F7F4EE" },
  { title: "Master Claude Code",        desc: "Learn the tool the way professionals use it — hooks, context management, multi-file edits, and settings that 10x your output speed.",             tags: ["Claude Code","Tooling","Workflow"],   bg: "var(--bg-surface)" },
  { title: "The Antigravity Framework", desc: "A structured, repeatable workflow for building with AI that doesn't collapse under complexity. Use it on every project forever.",                 tags: ["Framework","Repeatable","Scalable"],  bg: "var(--bg-surface)" },
  { title: "Think in Systems",          desc: "Shift from prompt-guesser to systems thinker. Decompose any product into buildable pieces — and delegate them precisely to your AI collaborator.", tags: ["Mindset","Architecture","Clarity"],   bg: "#F7F4EE" },
];

export default function Services() {
  return (
    <section id="outcomes" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* Label */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>Outcomes</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>04 / What You Walk Away With</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "80px 56px 72px" }}>
          <h2 className="anim-lines" style={{ fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, color: "#111" }}>
            <span className="line-mask"><span className="line-inner">Real</span></span>
            <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic" }}>outcomes.</span></span>
          </h2>
        </div>
        <div style={{ padding: "80px 56px 72px", display: "flex", alignItems: "center" }}>
          <p className="anim-fade" style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--fg-2)", fontWeight: 300, maxWidth: "420px" }}>
            Not theory. Not certificates. Four concrete things you&apos;ll have when you finish — that you can use immediately, on the next project, and the one after.
          </p>
        </div>
      </div>

      {/* Outcome grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {outcomes.map((item, i) => (
          <div key={i}
            style={{ borderRight: i % 2 === 0 ? B : "none", borderBottom: i < 2 ? B : "none", padding: "56px 48px", background: item.bg, position: "relative", overflow: "hidden", transition: "background .35s" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.querySelectorAll<HTMLElement>("p,h3,span").forEach(el => el.style.color = "#fff");
              e.currentTarget.querySelectorAll<HTMLElement>("[data-tag]").forEach(el => { el.style.borderColor = "rgba(255,255,255,.25)"; el.style.color = "rgba(255,255,255,.7)"; });
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = item.bg;
              e.currentTarget.querySelectorAll<HTMLElement>("p,h3,span").forEach(el => el.style.color = "");
              e.currentTarget.querySelectorAll<HTMLElement>("[data-tag]").forEach(el => { el.style.borderColor = ""; el.style.color = ""; });
            }}>
            <span style={{ position: "absolute", top: "14px", right: "26px", fontSize: "80px", fontWeight: 900, color: "rgba(0,0,0,.04)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none", pointerEvents: "none" }}>0{i + 1}</span>
            <h3 style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", marginBottom: "16px", lineHeight: 1.1 }}>{item.title}</h3>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--fg-2)", fontWeight: 300, maxWidth: "380px", marginBottom: "32px" }}>{item.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {item.tags.map(t => (
                <span data-tag key={t} style={{ padding: "5px 14px", border: B, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", transition: "all .2s" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*="repeat(2, 1fr)"]{grid-template-columns:1fr!important}
          div[style*="1fr 1fr"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
