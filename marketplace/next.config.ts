import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [new URL("http://localhost:3000/**")],
  },
};

export default nextConfig;
