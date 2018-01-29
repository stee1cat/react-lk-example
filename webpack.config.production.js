const webpack = require('webpack');
const merge = require("webpack-merge");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.config.common');

module.exports = merge(common, {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ],
        app: [
            'babel-polyfill',
            './index.js'
        ]
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                url: false
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('assets/[name].[contenthash:8].css'),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            },
            output: {
                comments: false
            }
        })
    ]
});
