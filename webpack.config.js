const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
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
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.[hash].js'
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png)$/,
                use: 'raw-loader'
            },
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
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader',
                exclude: /images/,
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'images',
                to: 'images'
            }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            template: '../index.hbs'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
    ]
};
