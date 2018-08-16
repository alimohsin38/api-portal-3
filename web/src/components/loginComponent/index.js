import styles from './loginComponent.styl'
import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import {BaseText, Button, SecondaryFont, Form, FormSection, FormGroup, LabelGroup, Input, Col} from '@abc/protonpack'
import {labels, messages, titles} from 'src/utils/staticData'
import {browserHistory} from 'react-router'

class Loginform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userName: '', password: '', typePassword: false, loginValidation: messages.enterEmailAndPassword, enterUsername: messages.enterEmail, visible: false, userValidvisible: false}
        this.handleChange = this.handleChange.bind(this)
        this.handleEyeClick = this.handleEyeClick.bind(this)
        this.handledOnSubmit = this.handledOnSubmit.bind(this)
    }

    handleChange(event) {        
        this.setState({[event.target.name]: event.target.value})
    }

    handleEyeClick() {
        this.setState({typePassword: !this.state.typePassword})
    }

    handledOnSubmit() {
        const location = browserHistory.getCurrentLocation()        

        if (this.state.userName === '' && this.state.password === '') {
            this.setState({visible: true, userValidvisible: false, loginValidation: messages.enterEmailAndPassword})
        } else if (this.state.userName === '') {
            this.setState({userValidvisible: true, visible: false})
        } else if (this.state.password === '') {
            this.setState({visible: true, loginValidation: messages.enterPassword, userValidvisible: false})
        } else if (this.state.userName !== '' && this.state.password !== '') {
            this.props.loginInSubmit({
                username: this.state.userName,
                password: this.state.password,
                organizationId: location.query.organizationId,
            })
            
            if (!this.props.isAuthenticated) {
                this.setState({loginValidation: messages.incorrectEmailOrPassword, visible: true, userValidvisible: false})
            } else {
                this.setState({visible: false, userValidvisible: false})
            }			
        } else {
            this.setState({loginValidation: messages.incorrectEmailOrPassword})
        }
    }

    render() {        
        const {userName, password, typePassword, loginValidation, enterUsername, visible, userValidvisible} = this.state        
        return (
            <div>
                <BaseText><h2 className={styles.heading}>{titles.login}</h2></BaseText>                
                <Form className={styles.loginForm}>
                    <FormSection>
                        <Col xs={12}>
                            <FormGroup className={styles.formGroup}>
                                <LabelGroup label="Email" id="email" className={styles.addBorder}>
                                    <Input type="text" data-abc-id="Email" value={userName} name='userName' onChange={this.handleChange} noBorder />                                    
                                </LabelGroup>
                                <div className={className(styles.incorrectfield, userValidvisible ? styles.show : styles.hide)}><BaseText><label className={styles.loginValidation}>{enterUsername}</label></BaseText></div>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup className={styles.formGroup}>
                                <LabelGroup label="Password" id="password" className={styles.addBorder}>
                                    <Input type={typePassword ? 'text' : 'password'} placeholder="password" icon={{type: 'eye', position: 'right', className: styles.passwordEye, onClick: this.handleEyeClick}} value={password} name='password' onChange={this.handleChange} noBorder />
                                </LabelGroup>
                                <div className={className(styles.incorrectfield, visible ? styles.show : styles.hide)}><BaseText><label className={styles.loginValidation}>{loginValidation}</label></BaseText></div>
                            </FormGroup>
                        </Col>                        
                        <Col xs={6}>
                            <SecondaryFont><label className={styles.forgotPassword}></label></SecondaryFont>
                        </Col>
                        <Col xs={6}>
                            <Button name='submit' className={styles.submit} onClick={this.handledOnSubmit}>{labels.login}</Button>
                        </Col>                        
                    </FormSection>
                </Form>
            </div>
        )
    }
}

Loginform.propTypes = {    
    loginInSubmit: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

export default Loginform
