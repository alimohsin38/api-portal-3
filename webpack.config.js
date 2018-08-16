const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')

const webpackConfig = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig

module.exports = {
    mode: webpackConfig.mode,
    bail: webpackConfig.bail,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    plugins: webpackConfig.plugins,
    devtool: webpackConfig.devtool,
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'react-router': 'ReactRouter',
        'react-stripe-elements': 'ReactStripeElements',
        redux: 'Redux',
        'redux-form': 'ReduxForm',
        moment: 'moment',
        reselect: 'reselect',
        '@abc/protonpack': 'protonpack',
        '@abc/plastic': 'plastic',
        '@abc/fetcher': 'fetcher',
        '@abc/fedagents': 'fedagents',
        '@abc/quarkicons': 'quarkicons',
        '@abc/validator': 'validator',
    },
    resolve: {
        modules: [
            path.resolve('./web'),
            'node_modules',
        ],
        alias: {
            app: 'src/app',
            components: 'src/components',
            state: 'src/app/state',
            utils: 'src/utils',
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.styl$/,
                exclude: /globalStyles/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]-[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                            ],
                        },
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            define: {
                                $variables: path.resolve('./web/src/variables.styl'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
                include: /globalStyles/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
}
