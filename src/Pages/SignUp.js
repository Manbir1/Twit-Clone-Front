import React, { useContext, useEffect } from 'react'
import SignUpForm from '../Components/Forms/SignUpForm' 
import AuthContext from '../Context/AuthContext'
import { useHistory } from 'react-router'
import isAuth from '../utils/useAuth'



export default function Signup() {
    const {auth, setAuth} = useContext(AuthContext)
    const history = useHistory()
    const onSubmit = async (e, name, username, email, password) => {
        // API call to backend to create user

        e.preventDefault();
        
        const ret = await fetch('http://localhost:8000/users/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password
            })
        })

        const body = await ret.json()
        if(body.userCreate){
            history.push('/users/'+username)
        }
    }
    
    useEffect(function handleAuth(){
        (async () => {
            const obj = await isAuth(auth, setAuth)
            if(obj.auth){
                history.push('/users/'+obj.username)
            }
        })()
    },[auth,history,setAuth])

    return (
        <SignUpForm onSubmit={onSubmit}/>
    )
}
