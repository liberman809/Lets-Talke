import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {setChat} from '../store/chatActions'

import {getLasMsg} from '../store/chatActions'
// import {findMessage} from '../store/massageActions'

export function ChatSide({chat,setMod}){

    const activeChat = useSelector(state => state.chatModule )

    const [message,setMessage] = useState('')
    useEffect(() =>{
        getLastMessage(chat)
    },[activeChat])

    async function getLastMessage(chat){
        try{
            const lastMsg = await getLasMsg(chat.chatId)
            setMessage(lastMsg.data)    
        }catch(err){}
    }

    if(message){
        return <div key={chat.chatName} className={(activeChat.chatId == chat.chatId)?'chatMenuName active':'chatMenuName'} onClick={function(){setChat(chat.chatId);setMod('chat')}}>
            <div>{chat.chatName}</div>
            <div className='chatLasMsg'>
                <div>{message.from.name + ':'}</div>
                <div className='chatLasMsgText'>{message.text}</div>
            </div>
        </div>
    }else{
        return <div key={chat.chatName} className={(activeChat.chatId == chat.chatId)?'chatMenuName active':'chatMenuName'} onClick={function(){setChat(chat.chatId);setMod('chat')}}>
        <div>{chat.chatName}</div>
        <div>New chat</div>
    </div>

    }
}