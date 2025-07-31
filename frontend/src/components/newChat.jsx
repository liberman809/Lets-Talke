import { useState } from 'react'
import { useSelector } from 'react-redux'

import{findUser} from '../store/userActions'
import {creatNewChat} from '../store/chatActions'
import {updateUser , updateSomeUser} from '../store/userActions'
import {socketAddUser} from '../store/socket'
import {setChat} from '../store/chatActions'

export function NewChat({setMod,setMenuMod}){

    const user = useSelector(state => state.userModule)
    const [email,setEmail] = useState('')
    const [userFound,setUserFound] = useState()

    async function searchUsser() {
        try{
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('please enter a corect Email')
                return;
            }
            const user = await findUser(email)
            setUserFound(user)
        }catch(err){
            console.log(err)
        }
    }


    async function newChat(e){
        try{
            e.preventDefault()

            const Nchat ={
                type: 'privet',
                creator: user.userId,
                participants: [{id:userFound._id,name:userFound.name},{id:user.userId,name:user.userName}],
            }
            const newChat =  await creatNewChat(Nchat)
    
            const userChats = (user.userChats)? user.userChats: []

            const updatUserChat = [...userChats, {chatId:newChat.data._id,chatName:userFound.name}]

            const updateChats = {
                chats:updatUserChat
            }
            updateUser(user.userId,updateChats)

            const updateSecentChats = {
                chats:[...userFound.chats,{chatId:newChat.data._id,chatName:user.userName}]
            }
        
            updateSomeUser(userFound._id,updateSecentChats)

            setChat(newChat.data._id)
            setMod('chat')
            setMenuMod('chats')
            socketAddUser(userFound._id)

        }catch(err){

        }
    }


    return <div className="newChat">
        <form onSubmit={(e) => newChat(e)} className='newGroupForm'>
            <div>Find user</div>
            <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            <input type='button' value={'search'} onClick={() => searchUsser()}></input>        
            {(userFound &&
                <div className='userFound'>
                    <div>Is this who your are looking for?</div>
                    <div className='userFdetails'>
                        <div className='userDetails'>
                            <div>{userFound.name}</div>
                            <div>{userFound.email}</div>
                        </div>
                    </div>
                </div>
        )}
            <input type='submit' value={'Start chat'}></input>
        </form>
    </div>
}