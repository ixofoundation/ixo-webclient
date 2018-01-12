const Path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const sourcePath = Path.join(__dirname, './src');
const Webpack = require('webpack');
const outPath = Path.join(__dirname, './dist');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
          warnings: false
        },
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new Webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});