/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './build', // Changes the build output directory to `./dist`.
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
}

export default nextConfig
