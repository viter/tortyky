/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4010',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'tortyky.space',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
