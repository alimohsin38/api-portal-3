export const types = {
    signUpForm:'SIGNUPFORM',
    cancel:'CANCEL',
}

export const cancel = () => {
    return {
        type:types.cancel, 
    }
}
    /*   
export const signupSubmit = (account) => {    
    
    return {
        type:types.signUpForm,
        fName,
        lName,
        email,
        password,
        phone, 
        companyName, 
        description
    }
}   */
