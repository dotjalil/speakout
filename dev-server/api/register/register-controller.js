const mongoose = require('mongoose')
const User = require('../../model/user-model')

module.exports.register = function(req, res) {
    const validate = validateRegisteration(req.body)
    if (!validate.isValid) {
        return res.status(400).json({ message: validate.errors })
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    newUser.save((err, user) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: 'Username is taken' })
            }
            return res.status(500).json({ message: 'Something went wrong, please try again' })
        }
        if (user) return res.send(user)
    })
}

function validateRegisteration(body) {
    const errors = []
    if (!body.username) {
        errors.push('Username is required')
    }
    if (!body.password) {
        errors.push('Password is required')
    }
    return {
        isValid: errors.length === 0,
        errors: errors
    }
}