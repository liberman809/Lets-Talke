const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { type } = require('express/lib/response')

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: false,
    },
    name:{
        type:String
    },
    participants: {
        type: Array,
        required: true,
        default: []
    },
    managers:{
        type: Array,
        required: false,
    },
    messages: {
        type: Array,
        default: []
    },
    description: { 
        type: String,
        required: false,
    }
    
}, { timestamps: true })



module.exports = mongoose.model('chats', chatSchema)
