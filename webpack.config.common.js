const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'assets/[name].[hash:8].js',
        publicPath: '/',
        chunkFilename: 'assets/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
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
                use: 'file-loader',
                exclude: /images/
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
        new HtmlWebpackPlugin({
            hash: false,
            template: '../index.hbs'
        })
    ]
};
