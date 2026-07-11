import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder (a stray lockfile lives in a parent
  // dir; without this Turbopack infers the wrong root).
  turbopack: {
    root: __dirname,
  },
  // Static export → Cloudflare Pages. No SSR / server actions.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export: no on-demand image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
