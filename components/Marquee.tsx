const B = "1px solid #111111";

const items = [
  "Claude Code",
  "Production MVPs",
  "AI Workflow",
  "Ship Real Products",
  "Not Just Demos",
  "Antigravity",
  "Build Faster",
  "Think Different",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap" style={{
      borderBottom: B, overflow: "hidden",
      background: "var(--accent)", padding: "16px 0",
    }}>
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
            <span style={{
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: i % 5 === 0 ? "var(--accent-gold)" : "rgba(255,255,255,0.85)",
              padding: "0 28px",
            }}>
              {item}
            </span>
            <span style={{
              display: "inline-block", width: "3px", height: "3px",
              borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}
