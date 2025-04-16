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
        protocol: "https",
        hostname: "forum-admin.ntubimdbirc.tw/backend", // ✅ 你的圖片來源主機
        port: "", // 或 "8000" 如果有明確 port
        pathname: "**",
      },
    ],
  },
};
export default nextConfig;
