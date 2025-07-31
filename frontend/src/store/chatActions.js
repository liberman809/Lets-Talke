import axios, { AxiosError } from 'axios';
import { store } from './store.js'
import { SET_CHATID,SET_CHATNAME,SET_PARTICIPANTS,SET_MANAGERS,SET_MESSAGES,SET_DESCRIPTION,SET_TYPE,SET_FOUNDER } from './chatReducer.js'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3030")

export async function creatNewChat(chat){
    try{
        const newChat = await axios.post(`http://localhost:3030/api/chat`,chat)
        return newChat.data
    }catch(err){
    }
}

export async function setChat(chatId){
    try{
        const chat = await axios.get(`http://localhost:3030/api/chat/${chatId}`)
        
        store.dispatch({
            type: SET_CHATID,
            chatId: chat.data.data._id
        })
        store.dispatch({
            type: SET_CHATNAME,
            chatName: chat.data.data.name
        })
        store.dispatch({
            type: SET_PARTICIPANTS,
            participants: chat.data.data.participants
        })
        store.dispatch({
            type: SET_MANAGERS,
            managers: chat.data.data.managers
        })
        store.dispatch({
            type: SET_MESSAGES,
            messages: chat.data.data.messages
        })
        store.dispatch({
            type: SET_DESCRIPTION,
            description: chat.data.data.description
        })
        store.dispatch({
            type: SET_TYPE,
            chatType: chat.data.data.type
        })
        store.dispatch({
            type: SET_FOUNDER,
            founder: chat.data.data.creator

        })
    }catch(err){

    }
}

export async function addMsg(chatId){
    try{
        const chat = await axios.get(`http://localhost:3030/api/chat/${chatId}`)

        store.dispatch({
            type: SET_MESSAGES,
            messages: chat.data.data.messages
        })

    }catch(err){

    }
}

export async function findChat(chatId) {
    try{
        const chat = await axios.get(`http://localhost:3030/api/chat/${chatId}`)
        return chat.data
    }catch(err){
        console.log('err',err)
    }
}

export async function updateChat(chat,updates){
    try{
        const updatChat = await axios.put(`http://localhost:3030/api/chat/${chat}`,updates)
        setChat(chat)
        return updatChat
    }catch(err){
        console.log(err)
    }
}

export function resetGroup(){

    store.dispatch({
        type: SET_CHATID,
        chatId: null
    })
    store.dispatch({
        type: SET_CHATNAME,
        chatName: null
    })
    store.dispatch({
        type: SET_PARTICIPANTS,
        participants: null
    })
    store.dispatch({
        type: SET_MANAGERS,
        managers: null
    })
    store.dispatch({
        type: SET_MESSAGES,
        messages: null
    })
    store.dispatch({
        type: SET_DESCRIPTION,
        description: null
    })
    store.dispatch({
        type: SET_TYPE,
        chatType: null
    })
    store.dispatch({
        type: SET_FOUNDER,
        founder: null

    })
}

export async function addNnewUser(chat,updates){
    try{
        const updatChat = await axios.put(`http://localhost:3030/api/chat/${chat}`,updates)
        setChat(chat)
        store.dispatch({
            type: SET_PARTICIPANTS,
            participants: updatChat.data.participants
        })    

        // return updatChat

    }catch(err){}
}


export async function getLasMsg(id){
    try{
        const lastMsg = await axios.get(`http://localhost:3030/api/chat/last/${id}`)
        return lastMsg.data
    }catch(err){}
}
 
