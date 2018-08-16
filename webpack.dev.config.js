const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')

module.exports = {
    mode: 'development',
    bail: false,
    entry: [
        './web/src/App.js',
    ],
    output: {
        path: path.join(__dirname,  '/public'),
        publicPath: '/',
        filename: 'apiPortal.js',
        library: 'apiPortal',
        libraryTarget: 'umd',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Platform API Portal',
            template: './web/src/index.html',
            staticServer: process.env.STATIC_SERVER,
        }),
        new webpack.DefinePlugin({ENV_APP_ROOT: JSON.stringify('/')}),
    ],
    devtool: 'source-map',
}
