import type { Metadata } from "next";
import localFont from "next/font/local";
import FancyRuler from "../components/FancyRuler";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

const delight = localFont({
  src: [
    { path: "../public/fonts/Delight-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/Delight-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/Delight-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Delight-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Delight-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Delight-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Delight-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Delight-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Delight-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-delight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KayKav. Academy: Built, not prompted",
  description: "Ship a real, deployed MVP with AI agents in four weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={delight.variable}>
      {/* browser extensions (antivirus/ad-block) inject attributes into <body>
          before hydration — ignore attribute diffs on this element only */}
      <body suppressHydrationWarning>
        {/* refresh always starts from the top — runs before the browser
            restores the previous scroll position */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';scrollTo(0,0)",
          }}
        />
        <SmoothScroll />
        <FancyRuler />
        {children}
      </body>
    </html>
  );
}
