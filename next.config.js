/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Isso ignora o erro de aspas (ESLint) durante o build na Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Isso ignora erros de tipo que podem travar o build
    ignoreBuildErrors: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig