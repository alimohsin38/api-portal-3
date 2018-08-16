import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {messages} from 'src/utils/staticData'
import * as validator from '@abc/validator'
import {SubmitButton} from '@abc/fedagents'
import {Row, Col, SecondaryFont, BalancedImage, Input, LabelGroup, Label, FormSection, Button, FormGroup} from '@abc/protonpack'
import Icon from '@abc/quarkicons'
import {validatePassword, isValidLength, hasUpperCase, hasLowerCase, hasNumber} from 'src/utils/common'
import styles from './signup.styl'

class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = this.getDefaultState()
        this.handleChange = this.handleChange.bind(this)
        this.handledOnSubmit = this.handledOnSubmit.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    getDefaultState() {
        return {
            fName:'',
            lName:'',
            email:'',
            phone:'',
            companyName:'',
            description:'',
            password:'',
            cPassword:'',
            fNameErrorMsg: '',
            lNameErrorMsg: '',
            emailErrorMsg: '',
            phoneErrorMsg: '',
            companyNameErrorMsg: '',
            passwordErrorMsg: '',
            cpasswordErrorMsg: '',
            showPassword:false,
            isPasswordValidLength:false,
            hasPasswordUpperCase:false,
            hasPasswordLowerCase:false,
            hasPasswordNumber:false,
        }
    }
    handleChange(event) {
        const value = event.target.value
        this.setState({
            [event.target.id]: value,
        })
        if (event.target.id === 'password') {
            this.setState({
                isPasswordValidLength: (isValidLength(value)),
                hasPasswordUpperCase: (hasUpperCase(value)),
                hasPasswordLowerCase: (hasLowerCase(value)),
                hasPasswordNumber: (hasNumber(value)),
            })
        }
    }
    handledOnSubmit(event) {
        event.preventDefault()
        if (this.validateForm()) {
            this.props.signupSubmit({
                email: this.state.email,
                password: this.state.password,
                fName: this.state.fName,
                lName: this.state.lName,
                phone: this.state.phone,
                companyName: this.state.companyName,
                description: this.state.description,
            })
        }
    }
    handleReset() {
        this.setState(this.getDefaultState())
    }
    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }
    validateForm() {
        this.setState({
            fNameErrorMsg :'',
            lNameErrorMsg:'',
            emailErrorMsg:'',
            passwordErrorMsg:'',
            cpasswordErrorMsg:'',
            phoneErrorMsg: '',
            companyNameErrorMsg: '',
        })
        let success = true
        if (!validator.validateRequired(this.state.fName)) {
            success = false
            this.setState({
                fNameErrorMsg : messages.emptyFirstnameMsg,
            })
        }
        if (!validator.validateRequired(this.state.lName)) {
            success = false
            this.setState({
                lNameErrorMsg : messages.emptyLastnameMsg,
            })
        }

        if (!validator.validateRequired(this.state.email)) {
            success = false
            this.setState({
                emailErrorMsg : messages.emptyEmailMsg,
            })
        } else if (!validator.validateEmail(this.state.email)) {
            success = false
            this.setState({
                emailErrorMsg : messages.invalidEmailMsg,
            })
        }

        if (!validator.validateRequired(this.state.companyName)) {
            success = false
            this.setState({
                companyNameErrorMsg : messages.emptyCompanyNameMsg,
            })
        }

        if (!validator.validateRequired(this.state.phone)) {
            success = false
            this.setState({
                phoneErrorMsg : messages.emptyPhoneMsg,
            })
        } else if (!validator.validatePhone(this.state.phone)) {
            success = false
            this.setState({
                phoneErrorMsg : messages.invalidPhoneNumber,
            })
        }

        if (!validator.validateRequired(this.state.password)) {
            success = false
            this.setState({
                passwordErrorMsg : messages.emptyPasswordMsg,
            })
        } else if (!validatePassword(this.state.password)) {
            success = false
            this.setState({
                passwordErrorMsg : messages.invalidPasswordMsg,
            })
        }

        if (!validator.validateRequired(this.state.cPassword)) {
            success = false
            this.setState({
                cpasswordErrorMsg : messages.invalidCPasswordMsg,
            })
        } else if (this.state.cPassword !== this.state.password) {
            success = false
            this.setState({
                cpasswordErrorMsg : messages.passwordMatchMsg,
            })
        }
        return success
    }
    render() {        
        const {fName, lName, email, phone, companyName, description, password, cPassword, showPassword} = this.state

        return (
            <div className={styles.loginCard}>                
                <form onSubmit={this.handledOnSubmit} className={styles.loginForm}>
                    <FormSection size="sm">
                        <Row>
                            <Col sm ={12}>
                                <h1 className={styles.title}>Sign up</h1>
                                <FormGroup
                                        name="companyName"
                                    >
                                    <LabelGroup id='companyName' label='Company Name' className={styles.addBorder}>
                                        <Input                                            
                                            type='text'
                                            maxLength='50'
                                            onChange={this.handleChange}
                                            value={companyName}
                                            noBorder
                                        />
                                    </LabelGroup>
                                    {<Label className = {styles.errorMsg}>{this.state.companyNameErrorMsg}</ Label>}
                                </FormGroup>                         
                                <FormGroup
                                        name="description"
                                    >
                                    <LabelGroup id='description' label='Description' className={styles.addBorder}>
                                        <Input                                            
                                            type='text'
                                            onChange={this.handleChange}
                                            value={description}
                                            noBorder
                                        />
                                    </LabelGroup>
                                </FormGroup>
                            </Col>
                            <Col sm ={12}>
                                <SecondaryFont size="lg">
                                    <h1 className={styles.title}>Developer</h1>
                                </SecondaryFont>
                            </Col>
                            <Col sm ={12}>
                                <Row>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="fName"
                                        >
                                            <LabelGroup id='fName' label='First Name' className={styles.addBorder}>
                                                <Input                                            
                                                    type='text'
                                                    maxLength='50'
                                                    value={fName}
                                                    onChange={this.handleChange}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.fNameErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="lName"
                                        >
                                            <LabelGroup id='lName' label='Last Name' className={styles.addBorder}>
                                                <Input                                            
                                                    type='text'
                                                    maxLength='50'
                                                    onChange={this.handleChange}
                                                    value={lName}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.lNameErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="email"
                                        >
                                            <LabelGroup id='email' label='Email' className={styles.addBorder}>
                                                <Input                                            
                                                    type='text'
                                                    maxLength='50'
                                                    value={email}
                                                    onChange={this.handleChange}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.emailErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="phone"
                                        >
                                            <LabelGroup id='phone' label='Phone' className={styles.addBorder}>
                                                <Input                                            
                                                    type='text'
                                                    maxLength='50'
                                                    value={phone}
                                                    onChange={this.handleChange}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.phoneErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="password"
                                        >
                                            <LabelGroup id='password' label='Password' className={styles.addBorder}>
                                                <Input
                                                    maxLength='50'
                                                    value={password}
                                                    type={this.state.showPassword ? 'text' : 'password'}
                                                    onChange={this.handleChange}
                                                    icon={{
                                                        type: 'eye',
                                                        position: 'right',
                                                        className: styles.passwordEye,
                                                        onClick:this.handleClickShowPassword,
                                                    }}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.passwordErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                    <Col md ={6}>
                                        <FormGroup
                                            name="cPassword"
                                        >
                                            <LabelGroup id='cPassword' label='Confirm Password' className={styles.addBorder}>
                                                <Input                                            
                                                    value={cPassword}
                                                    type={showPassword ? 'text' : 'password'}
                                                    maxLength='50'
                                                    onChange={this.handleChange}
                                                    noBorder
                                                />
                                            </LabelGroup>
                                            {<Label className = {styles.errorMsg}>{this.state.cpasswordErrorMsg}</ Label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>                       
                            <Col md ={6}>
                                <div className={styles.imageWindow}>
                                    <BalancedImage src='' size='4.37rem' placeholder='https://api.adorable.io/avatars/173/abott@adorable.png' />
                                    <Icon
                                        type= 'cloud-upload'
                                    />
                                </div>                                
                            </Col>
                            <Col md={12}>
                                <SubmitButton
                                    className={styles.submit}
                                    type="submit"                                                                        
                                    size="sm"
                                >
                                    Save
                                </SubmitButton>
                                <Button
                                    className={styles.submit}                                    
                                    size="sm"
                                    onClick = {this.handleReset}
                                >Cancel</Button>
                            </Col>
                        </Row>
                    </FormSection>
                </form>
            </div>
        )
    }
}

SignUpScreen.propTypes = {
    signupSubmit: PropTypes.func.isRequired,
}

export default SignUpScreen
