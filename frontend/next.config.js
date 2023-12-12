/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  serverRuntimeConfig: {
    BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
    BACKEND_PORT: process.env.BACKEND_PORT,
  }
}

module.exports = nextConfig
