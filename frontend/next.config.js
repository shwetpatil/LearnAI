/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "picsum.photos",
    },
  ],
}
}

module.exports = nextConfig
