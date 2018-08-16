//  const Authorization= require('./apiOrchestrator/Authorization')
//  const Organization= require('./apiOrchestrator/Organization')

const isProd = process.env.NODE_ENV === 'production'
let apiEndpoints = {
    platformAuthorization: 'http://dev.30preprod.com/api/authorization',
    platformOrganization: 'http://dev.30preprod.com/api/organization',
}

if (isProd) {
    apiEndpoints = {
        platformAuthorization: 'http://authorization:8080',
        platformOrganization: 'http://organization:8080',
    }
}

//  const platformAuthService = new Authorization(apiEndpoints.platformAuthorization)
//  const platformOrgService = new Organization(apiEndpoints.platformOrganization)

module.exports = {
    apiEndpoints,
}