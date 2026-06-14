import withBundleAnalyzer from '@next/bundle-analyzer';

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
      // Vercel Blob Storage
      {
        protocol: 'https',
        hostname: 's6q6c5mhgszgcccf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      // Development: localhost:4000 (CMS API)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      // ImageKit CDN - for images uploaded to ImageKit
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
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
        // Cache CSS files with proper headers
        source: '/_next/static/css/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
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
  
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion'],
    // Reduce JavaScript execution time by optimizing server components
    serverComponentsExternalPackages: [],
  },
  
  // Webpack configuration for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundle
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            gsap: {
              name: 'gsap',
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              priority: 40,
            },
            // Common vendor chunk
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 20,
              minChunks: 2,
            },
          },
        },
      };
    }
    return config;
  },
  
  // Compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

