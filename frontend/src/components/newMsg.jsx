import { useState } from 'react'
import { useSelector } from 'react-redux'
import {newMsg} from '../store/massageActions'
import {updateChat} from '../store/chatActions'
import {socketNewMsg} from '../store/socket'
import { useNavigate } from 'react-router-dom'


export function NewMsg({setMod, peerId}){

    const activeChat = useSelector(state => state.chatModule )
    const user = useSelector(state => state.userModule )



    const [text,setText] = useState('')

    async function newMassage(e){
        try{
            e.preventDefault()
            const massage = {
                from: {
                    id:user.userId,
                    name:user.userName
                },
                to: {
                    id:activeChat.chatId,
                    name: (activeChat)?activeChat.chatName:''
                },
                text: text
            }

            const newMesage = await newMsg(massage)
            const chatMessages = (activeChat.messages)?activeChat.messages: []
            const updats = {
                messages: [...chatMessages,newMesage._id]
            }
            const chatUpdates = await updateChat(activeChat.chatId,updats)
            setText('')
            socketNewMsg(activeChat.chatId)
        }catch(err){

        }
    }

    return <div className="newMsg">
        <form className="newMsgForm" onSubmit={(e) => newMassage(e)}>
            <input type="text" className="msgText" placeholder="Massage" value={text} onChange={(e) => setText(e.target.value)}></input>
            <input type="submit" className="msgSend" value={"send"}></input>
        </form>
    </div>
}