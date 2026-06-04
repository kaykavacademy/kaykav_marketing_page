import Image from "next/image";

const B = "1px solid #111";

export default function Footer() {
  return (
    <footer style={{ display: "grid", gridTemplateColumns: "200px 1fr auto auto", background: "#F7F4EE" }}>
      <div style={{ borderRight: B, padding: "24px 28px", display: "flex", alignItems: "center" }}>
        <Image src="/logo.svg" alt="KayKav" width={100} height={32}
          style={{ height: "20px", width: "auto", opacity: 0.5 }} />
      </div>
      <div style={{ borderRight: B, padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "var(--fg-3)", letterSpacing: "0.06em" }}>
          © {new Date().getFullYear()} KayKav Academy. All rights reserved.
        </span>
      </div>
      <div style={{ borderRight: B, padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "var(--fg-3)", letterSpacing: "0.06em" }}>Built, Not Prompted.</span>
      </div>
      <div style={{ padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "var(--fg-3)", letterSpacing: "0.06em" }}>GMT+1</span>
      </div>
      <style>{`@media(max-width:768px){footer{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}
