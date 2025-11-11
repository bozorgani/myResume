/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Image optimization settings
  images: {
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum quality for images
    minimumCacheTTL: 60,
    // Remote patterns for images
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
  
  // Security headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        // Cache static assets
        source: '/:path*(.jpg|.jpeg|.png|.gif|.webp|.svg|.ico|.woff|.woff2|.ttf|.eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        // Cache API responses
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300'
          }
        ],
      },
    ];
  },
  
  // Enable powered by header removal (better for security)
  poweredByHeader: false,
  
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
};

export default nextConfig;

