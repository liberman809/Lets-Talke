const express = require('express')
const router = express.Router()
const { signUp, logIn, getToken } = require('./auth.controller')


router.post('/signup', signUp)
router.post('/logIn', logIn)
router.get('/get', getToken)


module.exports = router