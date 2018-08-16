import styles from './signup.styl'

import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, BalancedImage, BaseText} from '@abc/protonpack'
import classNames from 'classnames'
import {titles} from 'src/utils/staticData'
import SignUpScreen from 'src/components/signUpComponent'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
    }
	
    render() {
        const {signupSubmit} = this.props
        return (
            <div>                
                <div id='header' className={classNames(styles.header)}>
                    <Row className={classNames(styles.marginNull)}> 
                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={6} lg={6} xl={6}>
                            <div>
                                <BalancedImage src='https://clubsolutionsmagazine.com/wp-content/uploads/2016/07/Screen-Shot-2016-07-07-at-3.44.51-PM.png' size='3rem' className={classNames(styles.logoImg)} />
                                <BaseText><span className={classNames(styles.logoTxt)}>{titles.APIPortal}</span></BaseText>
                            </div>
                        </Col>

                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={6} lg={6} xl={6}>
                            <BaseText><span className={classNames(styles.logoTxt, styles.docsLink)}>{titles.APIDocs}</span></BaseText>
                        </Col>
                    </Row>
                </div>                    
                
                <Container className={classNames(styles.paddingNull)}>
                    <Row> 
                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={12} lg={12} xl={12}></Col>

                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.signUpWrapper}>
                                {<SignUpScreen signupSubmit = {signupSubmit} />}
                            </div>
                        </Col>
                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={12} lg={12} xl={12}></Col>
                    </Row>
                </Container>
                
                <div id='footer'>
                    <Row className={classNames(styles.marginNull)}> 
                        <Col xs={{col: 12, noGutters: 'both'}} sm={12} md={12} lg={12} xl={12}></Col>
                    </Row>
                </div> 
            </div>
        )
    }
}

SignUp.propTypes = {
    signupSubmit: PropTypes.func.isRequired,
}

export default SignUp