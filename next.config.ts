import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to THIS project. Without this, Next.js walks up the
  // filesystem, finds a stray package-lock.json / node_modules in a parent
  // directory, and resolves modules (including React) from the wrong place.
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),

  // The TinaCMS visual editor is a static SPA built to /public/admin/index.html.
  // Redirect the friendly /admin path to it.
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
