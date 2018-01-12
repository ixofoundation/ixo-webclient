const Path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sourcePath = Path.join(__dirname, './src');
const isProduction = process.argv.indexOf('-p') >= 0;

module.exports = {
    context: sourcePath,
    entry: {
      main: './client/index.tsx',
      vendor: [
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'redux'
      ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new Webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ],
        target: 'web',
        resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['browser', 'main']
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    },
    module: {
        loaders: [
        // .ts, .tsx
        {
            test: /\.tsx?$/,
            use: isProduction
            ? 'awesome-typescript-loader?module=es6'
            : [
                'react-hot-loader/webpack',
                'awesome-typescript-loader'
            ]
        },
        // css
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                loader: 'css-loader',
                query: {
                    modules: true,
                    sourceMap: !isProduction,
                    importLoaders: 1,
                    localIdentName: '[local]__[hash:base64:5]'
                }
                },
                {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                    require('postcss-import')({addDependencyTo: Webpack}),
                    require('postcss-url')(),
                    require('postcss-cssnext')(),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({disabled: isProduction}),
                    ]
                }
                }
            ]
            })
        },
        // static assets
        {test: /\.html$/, use: 'html-loader'},
        {test: /\.png$/, use: 'url-loader?limit=10000'},
        {test: /\.jpg$/, use: 'file-loader'},
        ],
    }
};