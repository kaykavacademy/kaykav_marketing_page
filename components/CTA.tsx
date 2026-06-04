"use client";

const B = "1px solid #111";

export default function CTA() {
  return (
    <section id="contact" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* Label */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>Enrolment</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>05 / Start Here</span>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px" }}>

        {/* Left — big text */}
        <div style={{ borderRight: B, padding: "96px 56px 88px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "480px" }}>
          <h2 className="anim-lines" style={{ fontSize: "clamp(44px, 6.5vw, 104px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.88, color: "#111" }}>
            <span className="line-mask"><span className="line-inner">Stop prompting.</span></span>
            <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic", color: "var(--accent)" }}>Start building.</span></span>
          </h2>
          <div style={{ marginTop: "56px" }}>
            <p className="anim-fade" style={{ fontSize: "16px", color: "var(--fg-2)", fontWeight: 300, lineHeight: 1.8, maxWidth: "440px", marginBottom: "48px" }}>
              Seats are limited each cohort. If you&apos;re serious about shipping production-grade products with AI — this is where you start.
            </p>
            <a href="https://mainstack.com/c/kaykav" target="_blank" rel="noopener noreferrer"
              data-hover className="anim-fade"
              style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "18px 48px", background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "background .2s, transform .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Enrol Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H6M11 3V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: B, padding: "36px 36px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "12px" }}>Platform</p>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>Mainstack</p>
            <p style={{ fontSize: "13px", color: "var(--fg-2)", fontWeight: 300, marginTop: "4px" }}>Hosted · Instant access</p>
          </div>
          <div style={{ borderBottom: B, padding: "36px 36px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "16px" }}>What&apos;s included</p>
            {["4 core modules","Live build sessions","Lifetime access","Community access"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ width: "5px", height: "5px", background: "var(--gold)", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#111", fontWeight: 400 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, background: "var(--accent)", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "180px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: "10px" }}>Ready to build?</p>
            <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1.3, letterSpacing: "-0.01em" }}>Seats are filling up for this cohort.</p>
          </div>
        </div>
      </div>

      {/* Social row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B }}>
        {["Instagram","Twitter / X","LinkedIn","Mainstack"].map((p, i) => (
          <a key={p}
            href={p === "Mainstack" ? "https://mainstack.com/c/kaykav" : "#"}
            target={p === "Mainstack" ? "_blank" : undefined}
            rel={p === "Mainstack" ? "noopener noreferrer" : undefined}
            data-hover
            style={{ display: "block", padding: "22px 32px", borderRight: i < 3 ? B : "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-2)", textDecoration: "none", transition: "background .2s, color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg-2)"; }}>
            {p}
          </a>
        ))}
      </div>

      <style>{`@media(max-width:900px){div[style*="1fr 360px"]{grid-template-columns:1fr!important}div[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}
