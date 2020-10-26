const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

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

router.get('/signup', (req, res) => {
    res.send("signup page")
})

router.post('/signup', (req, res) => {
    const user = new User({
        username: req.body.username,
        uid: req.body.uid,
    })
    console.log(req.body);
    let token = jwt.sign({ username: req.body.username, uid: req.body.uid }, process.env.JWT_SECRET)
    user.save()
        .then(() => {
            res.status(200).send(token)
        }).catch((err) => {
            res.status(403).send(err)
        })
})

router.post('/user', verify, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403).send("access denied")
        } else {
            User.findOne({ "uid": req.body.uid })
                .then((data) => {
                    res.status(200).send(data)
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
        }
    })

})

module.exports = router
