const express = require('express')
const router = express.Router()

const { verify } = require('../auth/auth.controller')
const { creatNewMessage, getAllMessages, getMessage, updateMessage, deleteMessage } = require('./message.controller')

router
    .post('/', creatNewMessage)
    .get('/', verify, getAllMessages)
router
    .get('/:id', getMessage)
    .put('/:id', verify, updateMessage)
    .delete('/', verify, deleteMessage)
// router
//     .get('/property/:propertie', getReviewByProperty)
module.exports = router
