const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, updateUser, deleteUser } = require('./user.controller')
const { verify } = require('../auth/auth.controller')



router
    .route('/')
    .get(getAllUsers)

router
    .route('/:id')
    .get(getUserById)
    .put( updateUser)
    .delete(verify, deleteUser)

module.exports = router
