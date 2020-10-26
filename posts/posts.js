const express = require('express')
const router = express.Router()
const Post = require("../models/postSchema")
const PostCard = require('../models/postCardSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

function verify(req, res, next) {
    const header = req.headers['authorization']
    if (typeof header !== undefined) {
        const token = header.split(' ')[1]
        req.token = token
        next()
    } else {
        console.log(header)
        res.status(403).send("Access denied")
    }
}

router.get('/', (req, res) => {
    res.send("This is posts get")
})

router.post('/add-post', verify, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403).send(err)
        } else {
            const postCard = new PostCard({
                username: req.body.username,
                uid: req.body.uid,
                title: req.body.title,
                description: req.body.description,
            })
            postCard.save()
                .then((data) => {
                    const post = new Post({
                        _id: mongoose.Types.ObjectId(data._id),
                        username: req.body.username,
                        uid: req.body.uid,
                        title: req.body.title,
                        description: req.body.description,
                        ingredients: req.body.ingredients,
                        instructions: req.body.instructions
                    })
                    post.save()
                        .then((data) => {
                            res.status(200).send(data)
                        })
                        .catch((err) => {
                            res.status(500).send(err)
                        })
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
            // } else {
            //     res.status(403).send("access denied")
            // }
        }
    })

})

// router.get('/post-cards', verify, (req, res) => {
//     jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
//         if (err) {
//             res.status(403).send(err)
//         } else {
//             PostCard.find({})
//                 .limit(20)
//                 .then((data) => {
//                     res.status(200).send(data)
//                 })
//                 .catch((err) => {
//                     res.status(400).send(err)
//                 })
//         }
//     })

// })

router.get('/post-cards/:time', verify, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403).send(err)
        } else {
            PostCard.find({ createdAt: { $lt: req.params.time } })
                .limit(20)
                .then((data) => {
                    res.status(200).send(data)
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
        }
    })
})

router.get('/posts/:id', verify, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403).send("Access denied")
        } else {
            Post.findOne({ _id: req.params.id })
                .then((data) => {
                    res.send(data)
                })
        }
    })
})

module.exports = router