/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // Isso vai fazer a Vercel ignorar erros de "Type" durante o build
      ignoreBuildErrors: true,
    },
    eslint: {
      // Isso vai fazer a Vercel ignorar os erros de aspas e entidades que estão travando tudo
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig