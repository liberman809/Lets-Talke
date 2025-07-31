import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import Peer from 'peerjs';

import {ChatsMenu} from'../components/chatsMenu'
import {Chat} from '../components/chat'
import {logIn} from '../store/userActions'


export function Chats(){

    const navigate = useNavigate()
    const user = useSelector(state => state.userModule )


    useEffect(() =>{
        if(user.userId !== undefined){
            navigate('/chats')
            
        }
        if(!user.userId){
            test()
        }
    },[user.userId])


    async function test(){
        try{
            const token = await axios.get(`http://localhost:3030/api/auth/get`,{withCredentials: true})
            console.log(token.data.decoded)
            logIn(token.data.decoded)
        }catch(err){
            alert('h')
            console.log(err)
        }

    }


    const [mod,setMod] = useState('chat')


    return <div className="chats">
        <ChatsMenu mod={mod} setMod={setMod} />
        <Chat mod={mod} setMod={setMod} />
    </div>
}