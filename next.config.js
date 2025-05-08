/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable compression
  compress: true,
  // Enable production source maps
  productionBrowserSourceMaps: true,
  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig 