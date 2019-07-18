const Post = require('../../model/post-model')
const User = require('../../model/user-model')
const auth = require('../../services/auth-services')
const moment = require('moment')
const url = require('url')

module.exports.getAllPosts = function(req, res) {
    // Post.find({}, (err, posts) => {
    //     if (err) {
    //         console.log('Err: ', err)
    //         return res.status(500).json({ message: 'Something went wrong, try again' })
    //     }
    //     if (posts) {
    //         res.status(200).json({ posts: posts })
    //     }
    // }).populate('author', 'username', 'User')
    Post.find({})
        .limit(2)
        .sort('-_id')
        .exec(function(err, posts) {
            if (err) {
                console.log('Err: ', err)
                return res.status(500).json({ message: 'Something went wrong, try again' })
            }
            if (posts) {
                res.status(200).json({ posts: posts })
            }
        })
}

module.exports.getMorePosts = function(req, res) {

    var query = url.parse(req.url,true).query
    var page = (query.p > 0) ? (query.p - 1) : 0
    var nResults = parseInt(query.n)

    Post.find({})
    .skip(page * nResults).limit(nResults)
    .sort('-_id')
    .exec(function(err, posts) {
        if (err) {
            console.log('Err: ', err)
            return res.status(500).json({ message: 'Something went wrong, try again' })
        }
        if (posts) {
            res.status(200).json({ posts: posts })
        }
    })
}

module.exports.getPostById = function(req, res) {
    console.log('Req Params: ', req.params.id)
    // Post.findById(req.body.id, (err, post) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).json()
    //     }
    //     if (post) {
    //         return res.status(200).json({ post: post })
    //     }
    // })
}

module.exports.postPost = function(req, res) {
    const id = auth.getUserId(req)
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json({ message: 'Something wrong happened' })
        }
        const post = new Post(req.body.post)
        post.author = user._id
        post.time = moment(post.time)
        post.save(error => {
            if (error) {
                return res.status(500).json({ message: 'Something wrong happened' })
            }
            return res.status(201).json({ message: 'Post created' })
        })
    })
}