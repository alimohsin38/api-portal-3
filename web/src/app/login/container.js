import Login from './'
import {connect} from 'react-redux'
import {loginInSubmit} from './action'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.apiPortal.login.isAuthenticated,
        isLoginView: state.apiPortal.login.isLoginView,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginInSubmit: userDetails => dispatch(loginInSubmit(userDetails)),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Login)

export default Container