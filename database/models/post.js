
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    language: String,
    code: String,
    inputs: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post