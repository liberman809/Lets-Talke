import { useState } from 'react'
import { useSelector } from 'react-redux'

import{findUser} from '../store/userActions'
import {creatNewChat} from '../store/chatActions'
import {updateUser} from '../store/userActions'
import {AddUser} from './addUser'
import {socketAddUser} from '../store/socket'
import {setChat} from '../store/chatActions'


export function NewGroup({setMod,setMenuMod}){
    const user = useSelector(state => state.userModule )

    const [groupName,setGroupName] = useState('')
    const [description,setDescription] = useState('')
    const [participantsList,setParticipants] = useState([])    

    async function newGrop(e){
        try{
            e.preventDefault()
            const Ngroup ={
                type: 'group',
                creator: {
                    id:user.userId,
                    name:user.userName
                },
                name: groupName,
                participants: [...participantsList,{id:user.userId,name:user.userName}],
                managers: [{id:user.userId,name:user.userName}],
                description: description
            }
            const newChat =  await creatNewChat(Ngroup)
    
            const userChats = (user.userChats)? user.userChats: []

            const updatUserChat = [...userChats, {chatId:newChat.data._id,chatName:newChat.data.name}]
            const updateChats = {
                chats:updatUserChat
            }
            updateUser(user.userId,updateChats)

            participantsList.forEach(async function(participant){
                try{
                    const user = await findUser(participant.id)
                    const updatUserChat = [...userChats, {chatId:newChat.data._id,chatName:newChat.data.name}]

                    const updateChats = {
                        chats:updatUserChat
                    }
                    updateUser(participant.id,updateChats)
                    socketAddUser(participant.id)
    
                }catch(err){
                    // console.log(err)
                }

            })
            setChat(newChat.data._id)
            setMod('chat')
            setMenuMod('chats')
        }catch(err){

        }
    }

    return <div className='newGroup'>
        <form onSubmit={(e) => newGrop(e)} className='newGroupForm'>
            <input type='text' placeholder='Group name' value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
            <textarea placeholder='Group description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <AddUser participantsList={participantsList} setParticipants={setParticipants} />
            <input type='submit' value={'Creat group'}></input>
        </form>
    </div>
}