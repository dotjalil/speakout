const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    ups: { type: Number, default: 0 },
    downs: { type: Number, default: 0 },
    time: { type: Date, default: Date.now }
})

postSchema.set('timestamps', true)

const postModel = mongoose.model('post', postSchema)

module.exports = postModel