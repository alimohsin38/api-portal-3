require('dotenv').config()

const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const koa = require('koa')
const serve = require('koa-static')
const bodyparser = require('koa-bodyparser')
const bearerToken = require('koa-bearer-token')
const koaBunyanLogger = require('koa-bunyan-logger')
const historyFallBack = require('koa-connect-history-api-fallback')

const conditional = require('koa-conditional-get')
const etag = require('koa-etag')

const Logger = require('@abc/logger')

const logger = Logger.createLogger({name: process.env.APP_ID || require('../../package.json').name}, true)
const stopServices = require('./services').stop

const indexHtml = require('./templates/index.html')
// -------------- Initialize Application & Loggers --------------

const app = new koa()

app.use(koaBunyanLogger(logger))
app.use(koaBunyanLogger.requestIdContext())
app.use(koaBunyanLogger.requestLogger())
app.use(koaBunyanLogger.timeContext())
app.use(conditional())
app.use(etag())

// -------------- Configuration for Production or Development --------------

if (!isProd) {
    const webpackConfig = require('../../webpack.config.js')
    const webpack = require('webpack')
    const compiler = webpack(webpackConfig)
    const webpackMiddleware = require('koa-webpack')

    app.use(historyFallBack())

    app.use(webpackMiddleware({
        compiler,
        dev:  {noInfo: process.env.webpackNoInfo || false, publicPath: '/'},
        hot: {log: logger.info.bind(logger), path: '/__webpack_hmr', heartbeat: 10 * 1000},
    }))
}

app.use(bodyparser())
app.use(bearerToken())

// -------------- Routes --------------

// const exampleRouter = require('./example')
// app.use(exampleRouter.routes())
// app.use(exampleRouter.allowedMethods())

//  organization route
const organizationRouter = require('./organization')

app.use(organizationRouter.routes())
app.use(organizationRouter.allowedMethods())

//  authorization route
const loginRouter = require('./login')

app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

if (isProd) {
    app.use(historyFallBack())
    app.use(async (ctx, next) => {
        await next()
        if (ctx.path === '/index.html') {
            ctx.body = indexHtml
        }
    })
    app.use(serve('public'))
}

// -------------- Start Server --------------

app.listen(port)

logger.info('----------------------------------------------')
logger.info(`App accessable at: ${process.env.IP_ADDR}:${port}`)
logger.info(`Runtime environment: ${process.env.NODE_ENV}`)
logger.info('----------------------------------------------')
logger.info(' ')

// -------------- Error Handling --------------

process.stdin.resume() // so the program will not close instantly

const exitHandler = function (options, err) {
    stopServices()

    if (err) {
        logger.error(err.stack)
    }
    if (options.exit) {
        process.exit()
    }
}

// do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}))

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}))

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}))
