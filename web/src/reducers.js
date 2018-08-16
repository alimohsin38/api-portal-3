import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import login from 'src/app/login/reducer'
import signUp from 'src/app/signup/reducer'

const ApiPortalReducer = combineReducers({    
    login,
    signUp,
})

export default ApiPortalReducer

export const devApiPortalReducer = combineReducers({
    apiPortal: ApiPortalReducer,
    form,
})