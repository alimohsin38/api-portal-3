const Router = require('koa-router')

const platformOrganizationServiceUrl = require('../services').apiEndpoints
const Authorization =  require('../apiOrchestrator/Authorization')
const Organization = require('../apiOrchestrator/Organization')

const router = new Router({prefix: '/organization/registration'})

router.post('/', async (ctx) => {
    try {
        ctx.log.info('Creating new organization.')

        const {organizationInfo, userInfo, developerInfo} = ctx.request.body
        if (!organizationInfo || !userInfo || !developerInfo) {
            ctx.status = 500
            ctx.type = 'application/json'
            ctx.body = {
                statusCode: 500,
                message: 'Data missing: Organization, user or developer',
            }
            return
        }

        ctx.time('Get token from client')
        const clientResponse = await Authorization.getTokenByClientCredentials(platformOrganizationServiceUrl.platformAuthorization)
        ctx.timeEnd('Get token from client')

        const accessToken = clientResponse.body.access_token

        ctx.time('organization registration')
        const organizationResponse =
            await Organization.createOrganization(platformOrganizationServiceUrl.platformOrganization,accessToken, organizationInfo)
        ctx.timeEnd('organization registration')
        const organizationId = organizationResponse.body.id

        ctx.time('Create user account')
        const userResponse = await Authorization.createUser(platformOrganizationServiceUrl.platformAuthorization,accessToken, organizationId,
            Object.assign({}, userInfo, 
                {
                    organizationId,
                }))
        ctx.timeEnd('Create user account')

        ctx.time('Create developer account')
        const developerResponse = await Organization.createDeveloper(platformOrganizationServiceUrl.platformOrganization,accessToken, organizationId,
            Object.assign({}, developerInfo, 
                {
                    organizationId,
                }))
        ctx.timeEnd('Create developer account')

        ctx.body = {
            organization:organizationResponse.body,
            user:userResponse.body,
            developer: developerResponse.body,
        }
        ctx.type = 'application/json'
        ctx.status = 200
        ctx.log.info(`organization Info= ${JSON.stringify(ctx.body)}`)
    } catch (e) {
        ctx.log.error(e)
        ctx.status = e.status || 500
        ctx.body = e.body
    }
})

module.exports = router
