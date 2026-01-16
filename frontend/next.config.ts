import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!backend) return [];

    const normalized = backend.endsWith("/") ? backend.slice(0, -1) : backend;

    return [
      {
        source: "/api/:path*",
        destination: `${normalized}/api/:path*`,
      },
      {
        source: "/health",
        destination: `${normalized}/health`,
      },
    ];
  },
};

export default nextConfig;
