import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {NewGroup} from './newGroup'
import {NewChat} from './newChat'
import {ChatSide} from './chatSide'

export function ChatsMenu({mod,setMod}){
    const user = useSelector(state => state.userModule)

    const chats = useSelector(state => state.userModule.userChats)

    const[menuMod,setMenuMod] = useState('chats')


    const renderChats = () => (
        (user.userChats.length === 0)?'no chats': <div>
            {chats.map((chat) =>{
            return <ChatSide key={chat.chatId} chat={chat} setMod={setMod} />
        })}
        </div>
    )

    const renderNewGroup = () => (<NewGroup setMod={setMod} setMenuMod={setMenuMod} />)
    const renderNewChat = () => (<NewChat setMod={setMod} setMenuMod={setMenuMod} />)

    const menu = {
        chats: renderChats,
        newGroup: renderNewGroup,
        newChat: renderNewChat
    }

    const renderMenu = menu[menuMod] || (() => <div>שגיאה</div>)

    return <div className="menu">
        <div className="chatMenuHeader">
            <div className= "userMenu">
                <div>{user.userName}</div>
                <div>EN</div>
            </div>
            <div className='chatMenuActions'>
                <div className="chatMenuBtn" onClick={() => setMenuMod('newGroup')}>New Group</div>
                <div className="chatMenuBtn" onClick={() => setMenuMod('newChat')}>New Chat</div>
                <div className="chatMenuBtn" onClick={() => setMenuMod('chats')}>Chats</div>
            </div>
        </div>

        <div className='chatsMenu'>
            {renderMenu()}
        </div>
        
    </div>
}