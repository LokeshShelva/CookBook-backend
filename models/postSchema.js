const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
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
    ingredients: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    commentsNo: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array,
    }
})

module.exports = mongoose.model('Post', PostSchema)