const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    from: {
        type: Object,
         required: true,
    },
    to: {
        type: Object,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

}, { timestamps: true })

module.exports = mongoose.model('messages', messageSchema)
