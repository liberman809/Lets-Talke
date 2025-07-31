import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import {findUser} from '../store/userActions'
import {ChatSide} from './chatSide'

export function ChatUserMod({mod,setMod,userId}){

    
    const logdInUser = useSelector(state => state.userModule )

    const [user,setUser] = useState()
    const [logdInUserChats,setULogdInUserChats] = useState()

    useEffect(() =>{
        getUser(userId)
        getLogdInUserChats()
    },[])

    async function getUser(userId){
        try{
            const user = await findUser(userId)
            setUser(user)
        }catch(err){
            console.log(err)
        }
    }

    function getLogdInUserChats(){
        let userChats = []
        for(let chat in logdInUser.userChats){
            userChats.push(logdInUser.userChats[chat].chatId)
        }
        setULogdInUserChats(userChats)
    }



    if(user){
        const date = new Date(user.createdAt);

        const options = {
            dateStyle: 'long',
            timeZone: 'Asia/Jerusalem' 
        }
    
        const localDate = date.toLocaleDateString('en-US', options);
    
        return <div className="chatUserMod">
            <div onClick={() => setMod('chat')}>Rreturn to chat</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>user sign up in {localDate}</div>

            {
                user.chats.map((chat) => {
                    if(logdInUserChats.includes(chat.chatId)){
                        return <ChatSide key={chat.chatId} chat={chat} setMod={setMod} />
                    }
                })
            }
        </div>
    }else{
        return <div>a</div>
    }
}