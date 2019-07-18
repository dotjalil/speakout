const postRoutes = require('./api/post/post-routes')
const registerRoutes = require('./api/register/register-routes')
const authRoutes = require('./api/auth/auth-routes')
const bodyParser = require('body-parser')
const cors = require('cors')
module.exports.registerRoutes = function(app) {
    app.use('/api', cors())
    app.use('/api', bodyParser.json())
    app.use('/api', postRoutes)
    app.use('/api', registerRoutes)
    app.use('/api', authRoutes)
}