const userModel = require('../../models/user.model')

const mongoose = require('mongoose')



async function getUsers() {
    try {
        const users = await userModel.find().select('-password')

        return users
    } catch (err) {
        throw 'cant find users: ' + err
    }

}

async function getUser(id) {
    try {
        let user = await userModel.findOne({email:id}).select('-password').select('-createdAt').select('-updatedAt')
        if(user){
            return user
        }else{
            let user = await userModel.findById(id).select('-password')
            return user
        }

    } catch (err) {
        throw 'canot find user ' + err
    }
}

async function update(id, updates) {
    try {
        
        const user = await userModel.findByIdAndUpdate(id, updates, {new: true}).select('-password')

        return user
    } catch (err) {
        throw 'canot update user ' + err
    }

}

async function deleteU(id) {
    try {
        const user = await userModel.findByIdAndDelete(id)
        return 'user deleted ' + user
    } catch (err) {
        throw 'canot update user ' + err

    }
}

module.exports = {
    getUsers,
    getUser,
    update,
    deleteU
}