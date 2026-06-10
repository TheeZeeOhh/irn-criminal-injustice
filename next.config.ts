import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/irn-criminal-injustice',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
