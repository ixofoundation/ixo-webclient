import { createRequire } from 'module'
const require = createRequire(import.meta.url)
console.log(require.resolve('readable-stream'))
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@blocknote/core', '@blocknote/mantine', '@blocknote/react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        stream: require.resolve('readable-stream'),
      }
    }

    return config
  },
}

export default nextConfig
