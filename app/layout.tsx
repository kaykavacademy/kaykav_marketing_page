import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KayKav Academy — Built, Not Prompted",
  description: "Production MVPs with Claude Code + Antigravity. A new way to build with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
