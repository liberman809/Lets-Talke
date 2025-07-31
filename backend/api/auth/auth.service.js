const mongoose = require('mongoose')
const user = require('../../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function saveUser({ email,name,password }) {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)
        const newUser = new user({ email,name,password:hash})
        await newUser.save()
        newUser.password = undefined
        
        return newUser

    } catch (err) { throw err }
}

async function signIn(email, password) {
    try {
        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)
        const found = await user.findOne({ email: `${email}` }).select('-createdAt').select('-updatedAt')
        const match = await bcrypt.compare(password, found.password)
        if (!match) return Promise.reject('Invalid password')
        return found
    } catch (err) {
        throw Error('user not exist')
    }
}

function createLoginToken(id) {
    const token = jwt.sign(id.toString(), 'MyNextVacation')
    return token
}

async function verifyJwt(token) {
    try {
        const verify = jwt.verify(token, 'MyNextVacation')
        return verify
    } catch (err) {
        throw 'not verify'
    }
}



module.exports = {
    saveUser,
    signIn,
    createLoginToken,
    verifyJwt
}