import {types} from './action'

const initState = {
    errorMessage:'',
    isAuthenticated:false, 
    userId:'',
    name:'',
    email:'',
}


const signUp = (state = initState, action) => {
    switch (action.type) {
        case types.cancel: {
            return state
        }
        default:
            return state
    }
}

export default signUp