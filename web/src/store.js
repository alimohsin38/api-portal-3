import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import {devApiPortalReducer as reducer} from 'src/reducers'

const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
export default createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))