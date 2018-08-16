const rp =  require('request-promise-native')
/*
class Organization {
    constructor(url) {
        this._url=url
    }
    createOrganization(accessToken, data) {
        const url = `${this._url}/organization`
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
}
*/
const createOrganization = (baseUrl,accessToken, data) => {
    const url = `${baseUrl}/organization`
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

const createDeveloper = (baseUrl,accessToken, organizationId, data) => {
    const url = `${baseUrl}/developer`
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

module.exports = {
    createOrganization,
    createDeveloper,
    //Organization,
}