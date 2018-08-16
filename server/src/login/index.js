const Router = require('koa-router')

const platformOrganizationServiceUrl = require('../services').apiEndpoints
const Authorization =  require('../apiOrchestrator/Authorization')

const router = new Router({prefix: '/login'})

router.post('/', async (ctx) => {
    try {
        ctx.log.info('Logging In.')

        const {username, password, organizationId} = ctx.request.body
        if (!username || !password || !organizationId) {
            ctx.status = 500
            ctx.type = 'application/json'
            ctx.body = {
                statusCode: 500,
                message: 'Data missing: username or password',
            }
            return
        }
		
        ctx.time('Getting access for login')
        const loginResponse = await Authorization.getTokenByUserCredentials(platformOrganizationServiceUrl.platformAuthorization, username, password, organizationId)
        ctx.timeEnd('Getting access for login')
		
        ctx.body = {
            loginResponse:loginResponse.body,
        }
        ctx.type = 'application/json'
        ctx.status = 200
    } catch (e) {
        ctx.log.error(e)
        ctx.status = e.status || 500
        ctx.body = e.body
    }
})

module.exports = router