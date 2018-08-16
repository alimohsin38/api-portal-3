import protonpack from '@abc/protonpack/dist/style.css' // eslint-disable-line no-unused-vars
import styles from './main.styl'

import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router'
import {Container} from '@abc/protonpack'
import {Routes} from 'src/index'
import store from 'src/store'
import classNames from 'classnames'

const App = () => (
    <Provider store={store}>
        <Container fluid className={classNames(styles.paddingNull)}>
            <Router history={browserHistory}>
                <Route path='/api-portal' childRoutes={Routes} />
            </Router>
        </Container>
    </Provider>
)

ReactDom.render(<App />, document.querySelector('#app'))

// Used to fire hot updates with the webpack hot middleware
if (module.hot) {
    module.hot.accept()
}
