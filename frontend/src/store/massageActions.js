import axios, { AxiosError } from 'axios';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3030")

export async function newMsg(massage){
    try{
        
        const newMassage = await axios.post(`http://localhost:3030/api/message`,massage)
        socket.emit("aviv")
        return newMassage.data.data
    }catch(err){

    }
}

export async function findMessage(messageId) {
    try{
        const message = await axios.get(`http://localhost:3030/api/message/${messageId}`)
        return message.data
    }catch(err){
        console.log('err',err)
    }
}
