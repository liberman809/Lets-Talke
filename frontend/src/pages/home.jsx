import { useEffect, useState } from "react"
import {newUser , logIn} from '../store/userActions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home(){
    const navigate = useNavigate()

    const userId = useSelector(state => state.userModule )

    // console.log(userId.userId === null)
    // redirect("/login")

    const [formType, setFormType] = useState('logIn')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')

    useEffect(() =>{
        if(userId.userId !== undefined){
            navigate('/chats')
        }
    },[userId.userId])

    async function signIn(e){
        try{
            e.preventDefault()
            const user = {
                email,
                password
            }
            const logInUser = await logIn(user)
        }catch(err){
            console.log(err)
        }

    }

    async function signUp(e){
        try{
            e.preventDefault()

            if (!/\S+@\S+\.\S+/.test(email)) { // Simple email validation
                alert('please enter a corect Email')
                return;
            }

            const user = {
                name,
                email,
                password
            }
            const nUser = await newUser(user)
        }catch(err){

        }
    }

    return <div className="home">
        <div className="homTitle">
            <h1>Lets Talke</h1>
        </div>
        <div className="homeForm">
            {(formType == 'logIn' && 
                <>
                    <form>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="submit" value={'Log In'} onClick={(e) => signIn(e)}></input>
                    </form>
                    <div className="toSignUp" onClick={() => setFormType('signUp')}>Sign Up</div>
                </>
            )}
            {(formType == 'signUp' && 
                <>
                    <form>
                        <input type="text" placeholder="Nickname" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <input type="submit" value={'Log In'} onClick={(e) => signUp(e)}></input>
                    </form>
                    <div className="toSignUp" onClick={() => setFormType('logIn')}>Log In</div>
                </>
            )}
        </div>

    </div>
}

export default Home