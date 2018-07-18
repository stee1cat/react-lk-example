const webpack = require('webpack');
const merge = require("webpack-merge");

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        open: true,
        hot: true,
        contentBase: false,
        port: process.env.PORT || 1337,
        historyApiFallback: true,
        disableHostCheck: true
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
