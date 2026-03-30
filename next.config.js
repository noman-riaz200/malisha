/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking during build (handle separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable compression
  compress: true,
  
  // Enable static generation for faster builds and pages
  output: 'standalone',
  
  // Enable powered by header removal
  poweredByHeader: false,
  
  // Image optimization - Enhanced for performance
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
      { protocol: 'https', hostname: '*.s3.*.amazonaws.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Enable modern formats (AVIF first for better compression)
    formats: ['image/avif', 'image/webp'],
    // Minimum cache TTL for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable static image import warning
    disableStaticImages: false,
  },
  
  // Enable stale-while-revalidate for faster page loads
  serverExternalPackages: ['mongoose'],
//  swcMinify: true, // Removed for Next.js 15 compatibility
  reactStrictMode: true,
  
  // Disable streaming metadata to prevent hydration errors
  experimental: {
    ppr: false,
  },
  
  // Reduce bundle size by eliminating moment.js
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Suppress Yandex bis_skin_checked hydration warning
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      
      if (dev) {
        // Ignore specific hydration warnings from browser extensions
        config.ignoreWarnings = [
          ...(config.ignoreWarnings || []),
          /Warning: Extra attributes from the server: bis_skin_checked/,
        ];
      }
    }
    return config;
  },

  
  // Security headers with caching for better performance
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Cache-Control',          value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/:path*.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/services/admission',
        destination: '/services/admission-service',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
