/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: (() => {
      const patterns = [];
      try {
        const api = process.env.NEXT_PUBLIC_CMS_API;
        if (api) {
          const u = new URL(api);
          patterns.push({ protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port || undefined, pathname: '/**' });
        }
      } catch {}
      // Always allow local dev API
      patterns.push({ protocol: 'http', hostname: 'localhost', port: '4000', pathname: '/**' });
      return patterns;
    })()
  }
};

export default nextConfig;


