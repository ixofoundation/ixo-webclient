const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const Webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
           sourceMap: true
        }),
        new Webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});