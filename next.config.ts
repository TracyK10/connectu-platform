import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
};

export default nextConfig;
