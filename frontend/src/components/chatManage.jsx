import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {findUser} from '../store/userActions'
import {AddNewUser} from './addNewUser'
import {Participant} from './participant'

import {updateChat,resetGroup} from '../store/chatActions'
import {updateUser,updateSomeUser} from '../store/userActions'

export function ChatManage({setMod,setUserId}){

    const user = useSelector(state => state.userModule )
    const activeChat = useSelector(state => state.chatModule )

    const [isManager,setIsManager] = useState(false)


    useEffect(() => {
        activeChat.managers.map((manager) => {
            if(manager.id === user.userId){
                setIsManager(true)
            }
        })
    },[activeChat.managers])

    async function leaveGroup() {
        try {
            const updatedParticipants = activeChat.participants.filter((participant) => participant !== user.userId);
    
            let updatedManagers = [...activeChat.managers];
            if (updatedManagers.includes(user.userId)) {
                updatedManagers = updatedManagers.filter((manager) => manager !== user.userId);
                if (updatedManagers.length === 0) {
                    updatedManagers.push(activeChat.participants[0]); 
                }
            }
    
            const chatUpdates = {
                participants: updatedParticipants,
                managers: updatedManagers
            };
    
            await Promise.all([
                updateChat(activeChat.chatId, chatUpdates),
                updateUser(user.userId, { chats: user.userChats.filter(chat => chat.chatId !== activeChat.chatId) })
            ]);
    
            resetGroup();
        }catch(err){}
    }

    return <div className='chatManage'>
        {(activeChat.type == 'group' &&
            <>
            <div className='groupDescription'>
                {activeChat.description}
            </div>
            {
                (isManager && <AddNewUser />)    
            }
            <div className='participantsList'>
                {            
                activeChat.participants.map((participant) => {
                    return <Participant key={participant.id} participant={participant} setMod={setMod} setUserId={setUserId} />
                })     
                }
            </div>
            
            </>
        )}

        <div className='groupActions'>
            <button onClick={() => leaveGroup()}>leave group</button>
            <div>By clicking you will leave the group and it will be deleted from your chat list</div>
        </div>
    </div>
}