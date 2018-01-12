const Path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const sourcePath = Path.join(__dirname, './src');
const Webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
          warnings: false
        },
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    },
    plugins: [
        new UglifyJSPlugin({
           sourceMap: true
        }),
        new Webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});