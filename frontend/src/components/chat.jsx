import { useSelector } from 'react-redux'
import {NewMsg} from './newMsg'
import {ChatHeader} from './chatHeader'
import {Message} from './message'
import { useEffect, useState } from 'react'
import {ChatManage} from './chatManage'
import {ChatUserMod} from './chatUserMod'
import {joinChat} from '../store/socket'


export function Chat({mod,setMod, peerId}){
    const activeChat = useSelector(state => state.chatModule)
    const [userId,setUserId] = useState()


    useEffect(() =>{
        if(activeChat.chatId) joinChat(activeChat.chatId)
    },[activeChat.chatId])

    if (!activeChat.chatId || !activeChat.messages) {
        return null
    }

    const renderChat = () => (
        <>
            <div className='chatBody'>
                {activeChat.messages.map((message) =>{
                    return <Message key={message}  messageId={message} />
                })}
            </div>
            <NewMsg setMod={setMod} peerId={peerId}/>
        </>
    )

    const renderChatManage = () =>(<ChatManage setMod={setMod} setUserId={setUserId} />)
    const renderUser =() =>(<ChatUserMod mod={mod} setMod={setMod} userId={userId} />)
    const renderVideo = () => (<div>aaa</div>)


    const chat ={
        chat: renderChat,
        chatManage: renderChatManage,
        user: renderUser,
        video: renderVideo
    }

    const renderChatContent = chat[mod] || (() => <div>שגיאה</div>)

    return <div className='chat'>
        <ChatHeader chat={activeChat} mod={mod} setMod={setMod} setUserId={setUserId} />
        {renderChatContent()}
    </div>
}