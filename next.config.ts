import type { NextConfig } from "next";

/**
 * Static export: the site is served from GitHub Pages, which has no Node
 * runtime. Every route is pre-rendered at build time.
 *
 * Images are handled by a custom loader (lib/image-loader.ts) that maps to the
 * width variants already produced by the asset pipeline, so `next/image` still
 * emits a real srcset without a server-side optimiser.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 768, 1024, 1400],
    imageSizes: [240, 320],
    formats: ["image/webp"],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
