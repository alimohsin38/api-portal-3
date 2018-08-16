
export const isValidLength = password => (password.length >= 8 && password.length <= 50)

export const hasUpperCase = password => (/([A-Z])/.test(password))

export const hasLowerCase = password => (/([a-z])/.test(password))

export const hasNumber = password => (/([0-9])/.test(password))

export const isValidPassword = password => (
    (isValidLength(password) &&
    hasUpperCase(password) &&
    hasLowerCase(password) &&
    hasNumber(password))
)

export const validatePassword = (password) => {
    let valid = false

    if (isValidLength(password) &&
        hasUpperCase(password) &&
        hasLowerCase(password) &&
        hasNumber(password)) {
        valid = true
    }

    return valid
}

export default validatePassword
