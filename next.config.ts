import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/irn-criminal-injustice',
  assetPrefix: '/irn-criminal-injustice',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
