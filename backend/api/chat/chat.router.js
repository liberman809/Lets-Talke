const express = require('express')
const router = express.Router()
const { creatNewChat, getAllChats, updateChat, deleteChat, getChatById, getLastMsg } = require('./chat.controller')
const { verify } = require('../auth/auth.controller')


router
    .route('/')
    .post(creatNewChat)
    .get(getAllChats)

router
    .route('/:id')
    .put( updateChat)
    .delete(verify, deleteChat)
    .get(getChatById)

router
    .route('/last/:id')
    .get(getLastMsg)


module.exports = router
