import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The piper/codrop cards render their GitHub social previews through
    // next/image; OG meta tags elsewhere don't need this.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
