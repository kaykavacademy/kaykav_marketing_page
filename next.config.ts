import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow verification/production builds to use an isolated dist dir so they
  // never collide with a running `next dev` (which owns the default .next).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // webp only — AVIF encodes of the large project screenshots are so slow
    // they hang image requests in dev (>90s per variant)
    formats: ["image/webp"],
  },
};

export default nextConfig;
