import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // enables static export
  //basePath: '/Developer-Portfolio', // replace with your repo name
  //assetPrefix: '/Developer-Portfolio/', // ensures assets are loaded from the correct path
  trailingSlash: true, // ensures correct relative paths
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
