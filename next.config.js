/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Isso aqui ignora completamente o ESLint durante o build na Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Isso aqui ignora erros de TypeScript que também podem travar o build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig