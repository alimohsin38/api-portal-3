import ApiPortalContainer from 'src/app/login/container'
import SignUpContainer from 'src/app/signup/container'

export {default as Reducer} from './reducers'

export const Routes = [
    {
        path: '/api',
        component: '',
        indexRoute: {onEnter: (nextState, replace) => replace('/api/signup')},
        childRoutes:[
            {path: 'login', component: ApiPortalContainer},
            {path: 'signup', component: SignUpContainer},
			{path: 'dashboard', component: ''},
        ],
    },
]
