const mongoose = require('mongoose')

module.exports.connectToDb = function() {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
        if (error) {
            console.log('Unable to connect to DB')
            throw error
        } else {
            console.log('DB connected successfully')
        }
    })
}

