/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://zippy-lily-d8ddca.netlify.app/"]
  }
}

module.exports = nextConfig
