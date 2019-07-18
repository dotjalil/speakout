const express = require('express')
const router = express.Router()
const controller = require('./post-controller')
const AuthServices = require('../../services/auth-services')

router.get('/post', controller.getAllPosts)
router.get('/post/:id', controller.getPostById)
router.post('/post', AuthServices.requireLogin, controller.postPost)
router.get('/more', AuthServices.requireLogin, controller.getMorePosts)

module.exports = router