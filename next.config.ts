import type { NextConfig } from "next";
import * as path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  images: {
    domains: ['pxcdn.reduno.com.bo'], // tu dominio de imágenes externas
  },
};

export default nextConfig;
