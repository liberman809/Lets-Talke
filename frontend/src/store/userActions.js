import axios, { AxiosError } from 'axios';
import { store } from './store.js'
import { SET_USERID,SET_USERNAME,SET_USEREMAIL,SET_USERCHATS } from './userReducer.js'
import {listen} from './socket.js'

export async function newUser(user) {
    try{
        const newUser = await axios.post(`http://localhost:3030/api/auth/signup`,user)
        console.log(newUser.data.newUser.chats)
        store.dispatch({
            type: SET_USERID,
            userId: newUser.data.newUser._id
        })
        store.dispatch({
            type: SET_USERNAME,
            userName: newUser.data.newUser.name
        })
        store.dispatch({
            type: SET_USEREMAIL,
            userEmail: newUser.data.newUser.email
        })
        store.dispatch({
            type: SET_USERCHATS,
            userChats: newUser.data.newUser.chats
        })


    }catch(err){
        console.log(err)
    }
    
}

export async function logIn(user) {
    try{
        const logInUser = await axios.post(`http://localhost:3030/api/auth/logIn`,user, { withCredentials: true })
        if(logInUser.status == '200')
        store.dispatch({
            type: SET_USERID,
            userId: logInUser.data.userLogIn._id
        })
        store.dispatch({
            type: SET_USERNAME,
            userName: logInUser.data.userLogIn.name
        })
        store.dispatch({
            type: SET_USEREMAIL,
            userEmail: logInUser.data.userLogIn.email
        })
        store.dispatch({
            type: SET_USERCHATS,
            userChats: logInUser.data.userLogIn.chats
        })

        listen(logInUser.data.userLogIn._id)


    }catch(err){
        console.log(err)
    }
    
}

export async function findUser(id) {
    try{
        const user = await axios.get(`http://localhost:3030/api/users/${id}`)
        return user.data.user
    }catch(err){
        console.log('ddddd',err)
    }
}


export async function updateUser(user,updat){
    try{
        const updatUser = await axios.put(`http://localhost:3030/api/users/${user}`,updat)
        store.dispatch({
            type: SET_USERCHATS,
            userChats: updatUser.data.user.chats
        })

    }catch(err){

    }
}

export async function updateUserChats(id){
    try{
        console.log('a' + id)
        const user = await axios.get(`http://localhost:3030/api/users/${id}`)
        store.dispatch({
            type: SET_USERCHATS,
            userChats: user.data.user.chats
        })

    }catch(err){

    }
}


export async function updateSomeUser(user,updat){
    try{
        const updatUser = await axios.put(`http://localhost:3030/api/users/${user}`,updat)
        return updatUser
    }catch(err){

    }
}