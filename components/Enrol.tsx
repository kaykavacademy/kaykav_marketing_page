"use client";

const B = "1px solid #111";

export default function Enrol() {
  return (
    <section id="enrol" style={{ background: "#F7F4EE", borderBottom: B }}>

      {/* Label */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: B }}>
        <div style={{ borderRight: B, padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>Enrolment</span>
        </div>
        <div style={{ padding: "16px 28px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>03 / Start Here</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px" }}>

        {/* Left */}
        <div style={{ borderRight: B, padding: "88px 56px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "420px" }}>
          <div>
            <h2 className="anim-lines" style={{
              fontSize: "clamp(48px, 7vw, 108px)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 0.88, color: "#111",
            }}>
              <span className="line-mask"><span className="line-inner">Stop prompting.</span></span>
              <span className="line-mask"><span className="line-inner" style={{ fontWeight: 200, fontStyle: "italic", color: "var(--accent)" }}>Start building.</span></span>
            </h2>
          </div>

          <div style={{ paddingTop: "56px" }}>
            <p className="anim-fade" style={{ fontSize: "17px", color: "var(--fg-2)", fontWeight: 300, lineHeight: 1.8, maxWidth: "440px", marginBottom: "48px" }}>
              Seats are limited each cohort. If you&apos;re serious about shipping production-grade products with AI — this is where you start.
            </p>
            <div className="anim-fade" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://mainstack.com/c/kaykav" target="_blank" rel="noopener noreferrer"
                data-hover
                style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  padding: "16px 40px", background: "var(--accent)", color: "#fff",
                  fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em",
                  textTransform: "uppercase", textDecoration: "none",
                  transition: "background .2s, transform .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Enrol on Mainstack
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <span style={{ fontSize: "12px", color: "var(--fg-3)", letterSpacing: "0.06em" }}>Instant access · Lifetime</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: B, padding: "36px 36px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: "14px" }}>What&apos;s included</p>
            {[
              "4 core modules",
              "Live build capstone",
              "Lifetime access",
              "Community access",
              "Antigravity Framework",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ width: "4px", height: "4px", background: "var(--gold)", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#111", fontWeight: 400 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Gold block */}
          <div style={{ flex: 1, background: "var(--gold)", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "200px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>Platform</p>
            <div>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "8px" }}>Hosted on Mainstack</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,.7)", fontWeight: 300 }}>Enrol and get instant access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social / contact row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B }}>
        {["Instagram", "Twitter / X", "LinkedIn", "Mainstack"].map((p, i) => (
          <a key={p}
            href={p === "Mainstack" ? "https://mainstack.com/c/kaykav" : "#"}
            target={p === "Mainstack" ? "_blank" : undefined}
            rel={p === "Mainstack" ? "noopener noreferrer" : undefined}
            data-hover
            style={{
              display: "block", padding: "20px 28px",
              borderRight: i < 3 ? B : "none",
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--fg-2)", textDecoration: "none", transition: "background .2s, color .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg-2)"; }}>
            {p}
          </a>
        ))}
      </div>

      <style>{`
        @media(max-width:900px){
          div[style*="1fr 360px"]{grid-template-columns:1fr!important}
          div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr 1fr!important}
        }
      `}</style>
    </section>
  );
}
