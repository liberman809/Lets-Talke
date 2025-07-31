const mongoose = require('mongoose')
// const user = require('../../models/user.model.js')
const { saveUser, signIn, createLoginToken, verifyJwt } = require('./auth.service')
const jwt = require('jsonwebtoken')


async function signUp(req, res) {
    try {
        const { email,name,password} = req.body
        const newUser = await saveUser({ email,name,password })

        const userLogIn = await signIn(email, password)
        const loginToken = createLoginToken(userLogIn._id.toString())
        res.cookie('loginToken', loginToken, { httpOnly: true, secure: false,sameSite: 'None',})
        res.status(200).json({ status: '200', newUser })

    } catch (err) {
        console.log(err)
        res.status(401).json({ status: '401', data: err })
    }
}

async function logIn(req, res) {
    try {
        const { email, password } =  req.body
        const userLogIn = await signIn(email, password)
        const cradentials = {id:userLogIn._id,password:userLogIn.password}
        const loginToken = createLoginToken(cradentials)
        res.cookie('loginToken', loginToken, { httpOnly: true, secure: false,sameSite: 'None',})
        userLogIn.password = undefined

        res.status(200).json({ status: '200', userLogIn })


    } catch (err) {
        console.log(err)
        res.status(401).json({ status: '401', data: err })
    }
}

async function verify(req, res, next) {
    try {
        console.log('verify')
        const authHeader = req.cookies.loginToken
        console.log('authHeader',authHeader)
        const token = await verifyJwt(authHeader)
        alert(token)
        console.log(token)
        next()

    } catch (err) {
        console.log(err)
        res.status(401).json(err.message)

    }
}

async function getToken(req, res, next) {
    console.log('b')
    try {
        const authHeader = req.cookies.loginToken
        console.log('authHeader',authHeader)
        // const decoded = jwt.verify(authHeader, 'MyNextVacation');
        // console.log('decoded',decoded)
        // res.status(200).json({ status: '200', decoded })

    } catch (err) {
        console.log('err',err)
        res.status(401).json(err.message)

    }
}




module.exports = {
    signUp,
    logIn,
    verify,
    getToken
}