const jwt = require('jsonwebtoken')

module.exports.generateJWT = function(user) {
    const tokenData = { username: user.username, id: user._id }
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SEC)
}

module.exports.requireLogin = function(req, res, next) {
    const token = decodeToken(req)
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in' })
    }
    next()
}

module.exports.getUserId = function(req) {
    const token = decodeToken(req)
    if (!token) {
        return null
    }
    return token.user.id
}

function decodeToken(req) {
    const token = req.headers.authorization || req.heaaders['authorization']
    if (!token) {
        return null
    }
    try {
        return jwt.verify(token, process.env.TOKEN_SEC)
    } catch(error) {
        return null
    }
}