import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import{findUser} from '../store/userActions'
import {addNnewUser} from '../store/chatActions'
import {updateSomeUser} from '../store/userActions'
import {socketAddUser} from '../store/socket'


export function AddNewUser(){

    const activeChat = useSelector(state => state.chatModule )

    const [email,setEmail] = useState('')
    const [userFound,setUserFound] = useState(null)
    const [loading, setLoading] = useState(false);

    async function searchUser() {
        setLoading(true);
        if (!/\S+@\S+\.\S+/.test(email)) { // Simple email validation
            alert('Please enter a correct email')            
            setLoading(false);
            return;
        }
        try{
            const user = await findUser(email)
            setUserFound(user)
        }catch(err){
            console.log(err)
        }finally {
            setLoading(false);
        }
    }

    async function addUser() {
        if (!userFound) return;
        try{
            if(!activeChat.participants.includes(userFound._id)){
                const updateParticipants = [...activeChat.participants,userFound._id]
                const updates ={
                    participants:updateParticipants
                }
                await addNnewUser(activeChat.chatId,updates)

                const updatesChats = [...userFound.chats,{chatId:activeChat.chatId,chatName:activeChat.chatName}]

                const chats ={
                    chats: updatesChats
                }
                await updateSomeUser(userFound._id,chats)
                socketAddUser(userFound._id)
            }
            else{
                console.log('ghgh')
            }
        }catch(err){
            console.log(err)
        }
    }

    return <div className='addUser'>
        <div>Find user</div>
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} aria-label="Enter email"></input>
        <input type='button' value={'search'} onClick={() => searchUser()} disabled={loading}></input>      
          
        {(userFound &&
            <div className='userFound'>
                <div>Is this who your are looking for?</div>
                <div className='userFdetails'>
                    <div className='userDetails'>
                        <div>{userFound.name}</div>
                        <div>{userFound.email}</div>
                    </div>
                    <div className='addUserAction' onClick={() => {addUser()}}>
                    Add to group
                    </div>
                </div>
            </div>
        )} 
    </div>
}