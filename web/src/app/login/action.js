import fetcher from '@abc/fetcher'
import {browserHistory} from 'react-router'

export const types = {
    login: '',
    loggedIn: 'LOGIN',
    forgotPassword:'FORGOTPASSWORD',
    signUpForm:'SIGNUPFORM',
    toggle:'TOGGLEFORM',
    error: 'ERROR',
    accessToken: '',
    unauthorized: 'UNAUTHORIZED',
}

const setOrganizationInfo = (organizationId, userId, accesssToken, refreshToken) => {
    localStorage.setItem('userId',userId)
    localStorage.setItem('organizationId',organizationId)
    localStorage.setItem('accesssToken',accesssToken)
    localStorage.setItem('refreshToken',refreshToken)
    
    fetcher.setOrganization(organizationId)
}

export const loginInSubmit = (userDetails) => {
    fetcher.post(`${ENV_APP_ROOT}login`, userDetails)
    .json((response) => {
        setOrganizationInfo(response.loginResponse.organization_id, response.loginResponse.user_id, response.loginResponse.access_token, response.loginResponse.refresh_token)
		
        types.accessToken = response.loginResponse.access_token
		
        browserHistory.push({
            pathname: '/api/dashboard',				
        })
    })
    .catch((err) => {
        return {type: types.error, errMessage: err.response}
    })
    
    if (types.accessToken !== '') {
        types.login = 'LOGIN'
    } else {
        types.login = types.unauthorized
    }	
    return {type:types.login}
}