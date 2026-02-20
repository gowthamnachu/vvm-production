import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // Rewrite clean section URLs to the single-page app
  // So /home, /foreword, /features, etc. all serve the same page
  async rewrites() {
    return [
      { source: "/home", destination: "/" },
      { source: "/foreword", destination: "/" },
      { source: "/features", destination: "/" },
      { source: "/facilities", destination: "/" },
      { source: "/admissions", destination: "/" },
      { source: "/testimonials", destination: "/" },
      { source: "/gallery", destination: "/" },
      { source: "/about", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
