import React, {useEffect, useContext} from 'react'
import LoginForm from '../Components/LoginForm'
import { useHistory } from 'react-router';
import AuthContext from '../Context/AuthContext';
import isAuth from '../utils/useAuth';


export default function Signin() {
    let history = useHistory();
    const {auth, setAuth} = useContext(AuthContext)

    const onFormSubmit = async (e, email, password) => {
        // API call to backend to create user
    
        e.preventDefault();
        
        const retJSON = await fetch('http://localhost:8000/users/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const ret = await retJSON.json()

        if(retJSON.status === 400){
    
        }else{
            // Set authentication and
            setAuth(true)
            history.push("/users/"+ret.username)
        }
    }

    useEffect(function handleAuth(){
        (async () => {
            const obj = await isAuth(auth, setAuth)
            console.log(obj)
            if(obj.auth){
                history.push('/users/'+obj.username)
            }
        })()
    },[auth,history,setAuth])

    return (
        <LoginForm onFormSubmit={onFormSubmit}/>
    )
}
