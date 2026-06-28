import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS project. Without this, Next.js walks up the
  // filesystem, finds a stray package-lock.json / node_modules in a parent
  // directory, and resolves modules (including React) from the wrong place —
  // which breaks prerendering with "Cannot read properties of null".
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),

  images: {
    // Allow Tina media (served from /public) plus common embed hosts.
    remotePatterns: [],
  },
};

export default nextConfig;
