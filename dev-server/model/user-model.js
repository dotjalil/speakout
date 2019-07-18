const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    username: {type: String, index: { unique: true }},
    password: String,
})

userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    const tempPassword = this.password
    this.password = bcrypt.hashSync(tempPassword)
    next()
})

userSchema.statics.matchPassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}

const User = mongoose.model('User', userSchema)

module.exports = User