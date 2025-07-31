const chat = require('../../models/chat.model')

const mongoose = require('mongoose')


async function saveChat({type,name,creator,participants,managers,messages,description }) {
    try {

        const newChat = new chat({ type,name,creator,participants,managers,messages,description })
        await newChat.save()
        return newChat

    } catch (err) { throw err }
}

async function getChats(query) {
    try {
        const chats = await chat.find(query)
        return chats
    } catch (err) {
        throw 'cant find users: ' + err
    }

}

async function update(id, updates) {
    try {
        const chatUpdates = await chat.findByIdAndUpdate(id, updates, {new: true})
        return chatUpdates
    } catch (err) {
        console.log
        throw 'canot update user ' + err
    }

}

async function remove(id) {
    try {
        const chat = await chat.findByIdAndDelete(id)
        return 'user deleted ' + chat
    } catch (err) {
        throw 'canot update user ' + err

    }
}

async function getChat(id) {
    try {
        const chatFound = await chat.findById(id)
        return chatFound

    } catch (err) {
        throw 'canot find user ' + err
    }
}

async function getFiltersChats(filter) {
    try {
        const properties = await propertie.find(filter).select('_id')
        return properties
    } catch (err) {
        console.log(err)
        throw 'canot find user ' + err

    }
}

module.exports = {
    saveChat,
    getChats,
    update,
    remove,
    getChat,
    getFiltersChats
}