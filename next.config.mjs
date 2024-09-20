import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import webpack from 'webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
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
        ...config.resolve.fallback,
        stream: require.resolve('readable-stream'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        events: require.resolve('events'),
        path: require.resolve('path-browserify'),
        string_decoder: require.resolve('string_decoder'),
      }

      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      )
    }

    return config
  },
}

export default nextConfig
