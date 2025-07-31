import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {updateChat,resetGroup} from '../store/chatActions'
import {updateSomeUser} from '../store/userActions'

export function Participant({participant,setMod,setUserId}){

    const user = useSelector(state => state.userModule )
    const activeChat = useSelector(state => state.chatModule )

    const [isManager,setIsManager] = useState()

    useEffect(() => {
        const manager = activeChat.managers.find((manager) => manager.id === participant.id)
        if(manager !== undefined) {
            setIsManager(true)
        }else{
            setIsManager(false)
        }
    },[activeChat])



    async function removeFromGroup(userId,memberChats){
        try{
            const updateParticipantsList = activeChat.participants.filter((participant) => participant !=userId)
            const userChatUpdat = memberChats.filter((chat) => chat.chatId != activeChat.chatId) 

            const updatParticipants = {
                participants: updateParticipantsList 
            }
            const updatChats = {
                chats:userChatUpdat
            }
            const updateParticipantsChat = await updateChat(activeChat.chatId,updatParticipants)
            const updateUserChats =  await updateSomeUser(userId,updatChats)
        }catch(err){}
    }

    async function addAsManager(){
        try{
            const updateChatManagers = [...activeChat.managers,{id:participant.id,name:participant.name}]
            const updatParticipants = {
                managers: updateChatManagers 
            }
            const updateParticipantsChat = await updateChat(activeChat.chatId,updatParticipants)
        }catch(err){}

    }

    async function removeAsManager(){
        try{
            const updateChatManagers = activeChat.managers.filter((manager) => manager.id != participant.id)
            const updatParticipants = {
                managers: updateChatManagers 
            }
            const updateParticipantsChat = await updateChat(activeChat.chatId,updatParticipants)
        }catch(err){}

    }

    function userDetails(userId){
        setMod('user') 
        setUserId(userId)
    }

    return <div className='participant'>
        <div className='participantDetails'>
            <div onClick={() => userDetails(participant.id)}>{participant.name}</div>
            <div>{participant.email}</div>
        </div>
            {
               (isManager)?<div>Manager</div>:<div>Member</div>
            }
            <div className='participantActions'>
                {(!isManager &&
                    <>
                    <button className='actionButton' onClick={() => removeFromGroup(participant.id,participant.chats)}>Remove from group</button>
                    <button className='actionButton' onClick={() => addAsManager()}>Add as manager</button>
                    </>
                )}
                {((isManager && participant.id != user.userId) &&
                    <button className='actionButton'  onClick={() => removeAsManager()}>Remove as manager</button>
                )}
            </div>
    </div>
}