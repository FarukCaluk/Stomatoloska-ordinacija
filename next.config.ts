import type { NextConfig } from "next";

// Cache Components is off on purpose: it keeps visited pages mounted (hidden) via
// React Activity, which fights the scroll-driven GSAP animations and the WebGL hero.
const nextConfig: NextConfig = {
  // Tailwind output is small; inlining it removes the render-blocking CSS request on first visit.
  experimental: { inlineCss: true },
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
