/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    // بهینه‌سازی برای بهتر شدن performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // بهینه‌سازی compiler
  compiler: {
    // حذف console.log در production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // بهینه‌سازی compression
  compress: true,
  // بهینه‌سازی فونت‌ها (به صورت پیش‌فرض فعال است)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:;",
    remotePatterns: (() => {
      const patterns = [];
      try {
        const api = "https://cms-api-pv3h.onrender.com";
        if (api) {
          const u = new URL(api);
          patterns.push({ protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port || undefined, pathname: '/**' });
        }
      } catch {}
      // Always allow local dev API
      patterns.push({ protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/**' });
      return patterns;
    })()
  },
  // بهینه‌سازی headers برای بهتر شدن caching و امنیت
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;


