import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No images.remotePatterns: the only external artwork (GitHub social
  // previews) now ships in OG meta tags, not through next/image.
};

export default nextConfig;
