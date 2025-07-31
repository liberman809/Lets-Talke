import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function ChatHeader({chat,mod,setMod,setUserId}){

    const user = useSelector(state => state.userModule)

    function changeMod(){
        if(mod === 'chat'){
            if(chat.type === 'group'){
                setMod('chatManage')
            }else{
                setMod('user') 
                const userId = chat.participants.find(participant => participant.id !== user.userId)?.id;
                if (userId) {
                    setUserId(userId);
                }            }
        }else{
            setMod('chat')
        }
    }

    function userDetails(userId){
        setMod('user') 
        setUserId(userId)
    }

    return (
        <>
            {chat.chatName ?(<div className='chatHeader'>
                <div className='chatName' onClick={() => changeMod()}>{chat.chatName}</div>
                <div className='chatManageHeader'>
                    {<div className='HedaerUser' onClick={() => userDetails(chat.founder.id)}>founder: {chat.founder.name}</div>}
                    <div className='chatManagers'>
                        managers:
                        { chat.managers &&
                            chat.managers.map((manager) => {
                                return <div key={manager} className='HedaerUser' onClick={() => userDetails(manager.id)}>{manager.name}</div>
                            })
                        }
                    </div>
                </div>
                <div className='chatMembers'>
                        members:
                        {
                        chat.participants.map((participant) => {
                                return <div key={participant.id} className='HedaerUser' onClick={() => userDetails(participant.id)}>{participant.name}</div>
                            })
                        }
                </div>
                </div>) :
                (typeof(chat.chatName) == 'undefined' && <div className='chatHeader'>
                <div className='chatName' onClick={() => changeMod()}>{chat.participants[0].name}</div>
                </div>)
            }
        </>
    )
}