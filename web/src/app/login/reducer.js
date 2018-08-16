import {types} from './action'

const initState = {
    isAuthenticated:false,
}

const login = (state = initState, action) => {
    switch (action.type) {
        case types.loggedIn: {
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
            }
        }
        case types.unauthorized: {
            return {
                ...state,
                isAuthenticated:false,
            }
        }		
        case types.error: {
            return {
                ...state,
                isAuthenticated:false,
            }
        }
        default:
            return state
    }
}
export default login