/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Development: localhost:4000 (CMS API)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      // Production: Add your production CMS API domain here
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'api.bozorgani.ir',
      //   pathname: '/uploads/**',
      // },
      // Or if CMS is on same domain:
      // {
      //   protocol: 'https',
      //   hostname: 'www.bozorgani.ir',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

export default nextConfig;

