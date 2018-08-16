require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const prodRoot = ''
const appRoot = process.env.LOCAL ? `${process.env.APP_ROOT}` : prodRoot

module.exports = {
    mode: 'production',
    bail: true,
    entry: ['./web/src/App.js'],
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'apiPortal.js',
        chunkFilename: 'apiPortal.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV_APP_ROOT: JSON.stringify(appRoot),
        }),
    ],
    devtool: '',
}
