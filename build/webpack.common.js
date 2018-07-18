const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '../src'),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    entry: {
        app: [
            'babel-polyfill',
            './index.jsx'
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'assets/[name].[hash:8].js',
        publicPath: '/',
        chunkFilename: 'assets/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, '../src'),
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: 'raw-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: '../static/images',
                to: 'images'
            }
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: '../static/index.html',
            title: 'Личный кабинет'
        })
    ]
};
