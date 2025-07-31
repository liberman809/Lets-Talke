import { useEffect, useState } from 'react'
import {findMessage} from '../store/massageActions'
import { useSelector } from 'react-redux'
import{findUser} from '../store/userActions'

export function Message({messageId}){

    const user = useSelector(state => state.userModule )

    const [message,setMessage] = useState('')
    const [sender,setSender] = useState('')

    useEffect(() =>{
        setData(messageId)
    },[messageId])


    async function setData(messageId){
        try{
            const message = await findMessage(messageId)
            setMessage(message.data)

            const sender =  await findUser(message.data.from.id)
            setSender(sender.name)

        }catch(err){}
    }

    if(message != '' && message != null){
        return <div className={(message.from.id == user.userId)? 'myMessage': 'message'}>
            <div className='sender'>{sender}</div>
            <div className='text'>{message.text}</div>
        </div>
    }else{

    }
}