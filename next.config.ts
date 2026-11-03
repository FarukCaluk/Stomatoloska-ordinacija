import type { NextConfig } from "next";

// Cache Components is off on purpose: it keeps visited pages mounted (hidden) via
// React Activity, which fights the scroll-driven GSAP animations and the WebGL hero.
const nextConfig: NextConfig = {
  // Tailwind output is small; inlining it removes the render-blocking CSS request on first visit.
  experimental: { inlineCss: true },
  // Photos are the clinic's calling card: originals go in untouched and are served as AVIF at q90.
  // A single allowed quality means every <Image> is served at 90, no per-image prop needed.
  images: { formats: ['image/avif', 'image/webp'], qualities: [90] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
