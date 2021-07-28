import React, {useEffect, useState, useContext} from 'react'
import ProfileHeader from '../Components/Profile/ProfileHeader'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import { Grid, makeStyles, Container, CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import AuthContext from '../Context/AuthContext'
import CreateTweet from '../Components/Tweets/CreateTweet'
import isAuth from '../utils/useAuth'

const useStyles = makeStyles({
    root: {
        maxWidth: "50%"
    },
    loading: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "80vh",
        margin: "auto"
    }
});

const followOnClick = () => {

}

export default function Profile() {
    const classes = useStyles()
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [tweetArr,setTweetArr] = useState([])
    const [content, updateContent] = useState('')
    const { handle } = useParams()
    const {auth, setAuth} = useContext(AuthContext)


    const createTweetAPI = async (e, content, updateContent) => {
        // API call to backend to create user
        e.preventDefault();

        const resJSON = await fetch('http://localhost:8000/tweet',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                content: content
            })
        })

        const res = await resJSON.json()
        res.username = user.username
        res.name = user.name

        setTweetArr([res,...tweetArr])

        updateContent('')
    }


    useEffect(function handleApi(){
        (async () => {
            isAuth(auth,setAuth)
            const ret = await fetch(`http://localhost:8000/users/profile/${handle}/header`,{
                method: 'GET',
                credentials: 'include',
            })

            let userResponse = null

            if(ret.status===400){
                history.push('/')
            }else{
                userResponse = await ret.json()
                setUser(userResponse)
            }

            const tweets = await (await fetch(`http://localhost:8000/tweet/${handle}/tweets`, {
                method: 'GET',
                credentials: 'include',
            })).json()

            for(let i = 0;i<tweets.length;i++){
                tweets[i].username = userResponse.username
                tweets[i].name = userResponse.name
            }

            setTweetArr(tweets)
        })()
    }, [handle,history, auth, setAuth])

    return (
    <>
    {user == null ? <CircularProgress className={classes.loading}/> : 
            (<Container className={classes.root}>
            <Grid container direction="column" spacing={0} >
                <Navbar />
                <ProfileHeader 
                    name={user.name} 
                    username={user.username}
                    description={user.description}
                    followers={user.followers}
                    following={user.following}
                    followOnClick={followOnClick}
                    />
                {auth && <CreateTweet 
                    content={content} 
                    updateContent={updateContent}
                    createTweetAPI={createTweetAPI}
                    />}
                <Feed 
                    tweetArr={tweetArr}
                    setTweetArr={setTweetArr}
                    />
            </Grid>
        </Container >)}
    </>
    )
}
