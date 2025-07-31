import { useState, useEffect } from 'react';
import{findUser} from '../store/userActions'

export function AddUser({participantsList , setParticipants}){

    const [email,setEmail] = useState('')
    const [userFound,setUserFound] = useState()
    const [loading, setLoading] = useState(false);


    async function searchUser() {
        setLoading(true);
        try{
            if (!/\S+@\S+\.\S+/.test(email)) { 
                alert('please enter a corect Email')
                setLoading(false);
                return;
            }
            if (!email.trim()) {
                alert('Please enter an email address');
                setLoading(false);
                return;
              }

            const user = await findUser(email)
            setUserFound(user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    async function addUuser() {
        if (!userFound) return;
        try{
            if(!participantsList.includes(userFound._id)){
                const updateParticipants = [...participantsList,{id:userFound._id,name:userFound.name}]
                // setParticipantObj([...participantObj,userFound])
                setParticipants(updateParticipants)
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
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
        <input type='button' value={'search'} onClick={() => searchUser()}></input>        
        
        {(userFound &&
            <div className='userFound'>
                <div>Is this who your are looking for?</div>
                <div className='userFdetails'>
                    <div className='userDetails'>
                        <div>{userFound.name}</div>
                        <div>{userFound.email}</div>
                    </div>
                    <div className='addUserAction' onClick={addUuser}>
                    Add to group
                    </div>
                </div>
            </div>
        )}
        <div className='participantsList'>
        {
            participantsList.map((participant) =>{
                return <div className='participant' key={participant._id}>
                    <div className='userDetails'>
                        <div>{participant.name}</div>
                        <div>{participant.email}</div>
                    </div>
                </div>
            })
        }
        </div> 
    </div>
}