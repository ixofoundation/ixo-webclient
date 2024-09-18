const webpack = require('webpack')
const CracoEsbuildPlugin = require('craco-esbuild')
// const { whenProd } = require('@craco/craco')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      const fallback = webpackConfig.resolve.fallback || {}
      Object.assign(fallback, {
        // All webpack 4 polyfills: https://gist.github.com/ef4/d2cf5672a93cf241fd47c020b9b3066a
        // To add you need to install the npm package then add it here:
        stream: require.resolve('readable-stream'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        'process/browser': require.resolve('process/browser'),
        fs: false,
      })
      webpackConfig.resolve.fallback = fallback
      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
        }),
        new NodePolyfillPlugin({ excludeAliases: ['process/browser', 'console'] }),
      ])
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          )
        },
      ]
      return webpackConfig
    },
  },
}
