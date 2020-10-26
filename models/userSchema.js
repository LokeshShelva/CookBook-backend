const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    posts: [String],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
    following: [String],
    followers: [String],
    followingNo: {
        type: Number,
        default: 0,
    },
    followersNo: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('User', userSchema)