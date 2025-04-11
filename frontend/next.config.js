/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api',
  },
  output: 'standalone',
  // Add redirect configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api:8080/:path*',
      },
    ];
  },
}

module.exports = nextConfig
