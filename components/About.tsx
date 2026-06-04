"use client";

const B = "1px solid #111";

export default function About() {
  return (
    <section id="about" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* Label */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>The Philosophy</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>03 / About</span>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: B }}>
        {/* Statement — spans 2 cols */}
        <div style={{ gridColumn: "1 / 3", borderRight: B, padding: "88px 56px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h2 className="anim-lines" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, color: "#111" }}>
            <span className="line-mask"><span className="line-inner">A new way</span></span>
            <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic" }}>to look at things.</span></span>
          </h2>
          <div style={{ marginTop: "56px" }}>
            <div style={{ width: "40px", height: "2px", background: "var(--gold)", marginBottom: "28px" }} />
            <p className="anim-fade" style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--fg-2)", fontWeight: 300, maxWidth: "540px" }}>
              Most AI courses teach you to type better prompts. KayKav teaches you to think like an engineer who happens to have an infinitely patient, infinitely capable collaborator.
            </p>
            <p className="anim-fade" style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--fg-2)", fontWeight: 300, maxWidth: "540px", marginTop: "20px" }}>
              The result isn&apos;t a prettier prompt. It&apos;s a product that ships, scales, and survives contact with real users.
            </p>
          </div>
        </div>
        {/* Gold block */}
        <div style={{ background: "var(--gold)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 36px", minHeight: "360px" }}>
          <span style={{ fontSize: "clamp(72px, 8vw, 120px)", fontWeight: 900, color: "rgba(255,255,255,.18)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}>03</span>
        </div>
      </div>

      {/* Three pillars */}
      <div className="anim-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {[
          { num: "—01", title: "Production or Nothing", body: "We only teach techniques that hold up under real traffic, real users, and real business pressure. If it only works in a demo, we don't teach it." },
          { num: "—02", title: "Workflow over Wizardry", body: "The magic isn't in the model — it's in the system around it. We give you a repeatable, structured workflow that works project after project." },
          { num: "—03", title: "Build to Learn",        body: "Every concept is taught through building something real. You leave each module with working code, not notes you'll never revisit." },
        ].map((item, i) => (
          <div key={i}
            style={{ borderRight: i < 2 ? B : "none", padding: "56px 44px", background: "#F7F4EE", transition: "background .3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-surface)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#F7F4EE"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "flex-start" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{item.title}</h3>
              <span style={{ fontSize: "11px", color: "var(--fg-3)", flexShrink: 0, marginLeft: "16px", fontWeight: 500 }}>{item.num}</span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--fg-2)", fontWeight: 300 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:900px){
          div[style*="1fr 1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="gridColumn"]{grid-column:auto!important}
          div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
