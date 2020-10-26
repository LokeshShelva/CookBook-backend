const mongoose = require('mongoose')

const PostCardSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    commentsNo: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('PostCard', PostCardSchema)