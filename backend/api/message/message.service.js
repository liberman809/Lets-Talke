const message = require('../../models/message.model')

const mongoose = require('mongoose')


async function saveMessage({ from,to,text }) {
    try {
        const newMessage = new message({ from,to,text })
        await newMessage.save()
        return newMessage

    } catch (err) { throw 'message alredy ' }
}

async function getMessages() {
    try {
        const messages = await message.find()

        return messages
    } catch (err) {
        throw 'cant find users: ' + err
    }

}

async function getMessageById(id) {
    try {
        const foundMessage = await message.findById(id)
        return foundMessage
    } catch (err) {
        throw 'cant find users: ' + err
    }

}

async function update(id, updates) {
    try {
        const message = await message.findByIdAndUpdate(id, updates).select('-password')
        return message
    } catch (err) {
        throw 'canot update user ' + err
    }

}

async function remove(id) {
    try {
        const message = await review.findByIdAndDelete(id)
        return 'user deleted ' + message
    } catch (err) {
        throw 'canot update user ' + err

    }
}

module.exports = {
    saveMessage,
    getMessages,
    getMessageById,
    update,
    remove,
}