const rp =  require('request-promise-native')

/*
class Authorization {
    constructor(url) {
        this._url=url
    }
    createUser(accessToken, data) {
        const url = `${this._url}/user`
        const options = {
            url,
            headers: {
            Accept: 'application/json;charset=UTF-8',
            Authorization: `Bearer ${accessToken}`,
            },
            body: data,
            json: true,
            method: 'post',
            resolveWithFullResponse: true,
        }
    
        return rp(options)
    }

    getTokenByClientCredentials() {
        const clientId = process.env.OAUTH2_CLIENT_CLIENTID
        const clientBasicAuthorization = process.env.OAUTH2_CLIENT_BASIC_AUTHORIZATION
        
        const url = `${this._url}/token?client_id=${clientId}&grant_type=client_credentials`
        const options = {
          url,
          headers: {
            Accept: 'application/json;charset=UTF-8',
            Authorization: `Basic ${clientBasicAuthorization}`
          },
          method: 'post',
          resolveWithFullResponse: true,
          json: true,
        }
    
        return rp(options)
    }
}
*/
const createUser = (baseUrl, accessToken, organizationId, data) => {
    const url = `${baseUrl}/user`
    const options = {
        url,
        headers: {
            Accept: 'application/json;charset=UTF-8',
            Authorization: `Bearer ${accessToken}`,
            'ABCFS-ORGANIZATION-ID': organizationId,
        },
        body: data,
        json: true,
        method: 'post',
        resolveWithFullResponse: true,
    }

    return rp(options)
}

const getTokenByClientCredentials = (baseUrl) => {
    const clientId = process.env.SECURITY_OAUTH2_CLIENT_CLIENTID
    const buff = new Buffer(`${clientId}:${process.env.SECURITY_OAUTH2_CLIENT_CLIENTSECRET}`)
    const clientBasicAuthorization = buff.toString('base64')

    const url = `${baseUrl}/token?client_id=${clientId}&grant_type=client_credentials`

    const options = {
        url,
        headers: {
            Accept: 'application/json;charset=UTF-8',
            Authorization: `Basic ${clientBasicAuthorization}`,
        },
        method: 'post',
        resolveWithFullResponse: true,
        json: true,
    }

    return rp(options)
}

const getTokenByUserCredentials = (baseUrl, username, password, organizationId) => {
    const clientId = process.env.SECURITY_OAUTH2_CLIENT_CLIENTID
    const buff = new Buffer(`${clientId}:${process.env.SECURITY_OAUTH2_CLIENT_CLIENTSECRET}`)
    const clientBasicAuthorization = buff.toString('base64')

    const url = `${baseUrl}/token?client_id=${clientId}&grant_type=password&username=${username}&password=${password}`

    const options = {
        url,
        headers: {
            Accept: 'application/json;charset=UTF-8',
            Authorization: `Basic ${clientBasicAuthorization}`,
            'ABCFS-ORGANIZATION-ID': organizationId,
        },
        method: 'post',
        resolveWithFullResponse: true,
        json: true,
    }

    return rp(options)
}

module.exports = {
    //  Authorization,
    getTokenByClientCredentials,
    createUser,
    getTokenByUserCredentials,
}