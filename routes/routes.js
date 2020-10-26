const express = require("express")
const userpath = require('../user/user')
const postsPath = require('../posts/posts')
const router = express.Router()

router.use('/user', userpath)
router.use('/posts', postsPath)

module.exports = router