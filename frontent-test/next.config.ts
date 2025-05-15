import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bergvik.se',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
