import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "140.131.115.161", // ✅ 你的圖片來源主機
          port: "8000", // 或 "8000" 如果有明確 port
          pathname: "**",
        },
      ],
    },
  };
export default nextConfig;
