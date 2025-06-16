import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "140.131.115.161",
        port: "8000",
        pathname: "**",
      },
    ],
  },
};
export default nextConfig;
