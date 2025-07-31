const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: {
        type: Array,
        required: true,
        default: []
    }


}, { timestamps: true, select: false })

module.exports = mongoose.model('users', userSchema)