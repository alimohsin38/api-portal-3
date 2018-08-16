import SignUp from './'
import {connect} from 'react-redux'
import {cancel} from './action'
import fetcher from '@abc/fetcher'
import {browserHistory} from 'react-router'
//  import {organizationRegistrationRoute} from 'src/utils/routes'

const mapDispatchToProps = (dispatch) => {
    return {
        cancel: () => dispatch(cancel()),
        signupSubmit:(account) => {
            const registrationInfo = {
                organizationInfo: {
                    name: account.companyName,
                    email: account.email,
                    phone: {
                        number: account.phone,
                    },
                },
                userInfo: {
                    identity: account.email,
                    password: account.password,
                    firstName: account.fName,
                    lastName: account.lName,
                },
                developerInfo: {
                    firstName: account.fName,
                    lastName: account.lName,
                    email: account.email,
                },
            }

            fetcher.post(`${ENV_APP_ROOT}organization/registration`, registrationInfo)
                .json((response) => {
                    setOrganizationInfo(response.organization.id, response.user.id)
                    //  TODO: login action : as it will redirect to dashboard.
                    browserHistory.push({
                        pathname: '/api/login',
                        search: `?organizationId=${response.organization.id}`,
                    })
                })
                .catch((err) => {
                    if (err.response) {
                        console.log('error') // eslint-disable-line
                    }
                })
        },
    }
}
const setOrganizationInfo = (orgId, userId) => {
    localStorage.setItem('userId',userId)
    localStorage.setItem('organizationId',orgId)

    fetcher.setOrganization(orgId)
}
const Container = connect(null, mapDispatchToProps)(SignUp)

export default Container