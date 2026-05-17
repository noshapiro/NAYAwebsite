import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Run from nearu-site so one lockfile, no port confusion
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
