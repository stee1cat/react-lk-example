const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const common = require('./webpack.config.common');

module.exports = merge(common, {
    entry: [
        'babel-polyfill',
        'whatwg-fetch',
        './index.js'
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: process.env.PORT || 1337,
        host: '0.0.0.0',
        publicPath: '/',
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/lkServiceApi': {
                target: 'https://lk.infopaycentr.ru',
                context: ["/lkServiceApi"],
                secure: false
            }
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        url: false
                    }
                }, 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
    ]
});
