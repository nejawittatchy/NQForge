import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/api-platform',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
