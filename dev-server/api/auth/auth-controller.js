const User = require('../../model/user-model')
const { generateJWT } = require('../../services/auth-services')

module.exports.login = function(req, res) {
    const validate = validateLogin(req.body)
    if (!validate.isValid) {
        return res.status(401).json({ message: validate.errors })
    } else {
        User.findOne({ username: req.body.username.toLowerCase() }, (error, user) => {
            if (error) {
                return res.status(500).json({ message: 'Something worng happened, try again' })
            }
            if (!user) {
                return res.status(401).json({ message: 'Cannot find a user with this usernam' })
            }
            const matchPassword = User.matchPassword(req.body.password, user.password)
            if (!matchPassword) {
                return res.status(401).json({ message: 'Password is incorrect' })
            }
            // if everything is ok, generate the jwt token
            const token = generateJWT(user)
            return res.status(200).json({ token: token })
        })
    }
}

function validateLogin(body) {
    const errors = []
    if (!body.username) {
        errors.push('Username is empty')
    }
    if (!body.password) {
        errors.push('Password is empty')
    }
    return {
        isValid: errors.length === 0,
        errors: errors
    }
}