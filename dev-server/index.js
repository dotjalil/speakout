const express = require('express')
const app = express()
const { setEnvironment } = require('./config/env')
const { connectToDb } = require('./config/db')

// Set Environment Variables
setEnvironment()

// Connect to Database
connectToDb()

// Register routes
const { registerRoutes } = require('./routes.js')
registerRoutes(app)

// Starts the server on the given port
app.listen(5000, () => {
    console.log('MEVN app listening on port 3000 in ' + process.env.NODE_ENV + ' mode!');
});