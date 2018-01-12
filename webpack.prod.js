const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Webpack = require('webpack');
const outPath = Path.join(__dirname, './dist');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
           sourceMap: true
        }),
        new Webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    output: {
        path: outPath,
        publicPath: './',
        filename: 'bundle.js',
    },
});