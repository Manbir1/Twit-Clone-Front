export default async function isAuth(auth, setAuth, setUser) {
    if(auth){
        return true
    }
    const res = await fetch('http://localhost:8000/users/isAuth',{
        method: 'GET',
        credentials: 'include'
    })

    const currAuth = await res.json()
    setAuth(currAuth.auth)
    setUser(currAuth.username)

    return { 
        auth: currAuth.auth,
        username: currAuth.username
    }
}