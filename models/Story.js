const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public','private']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'User'
    },
    likes:{
        type: Number,
        default: 0
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Story',StorySchema)