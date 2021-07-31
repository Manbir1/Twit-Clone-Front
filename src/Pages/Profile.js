import React, {useEffect, useState, useContext} from 'react'
import ProfileHeader from '../Components/Profile/ProfileHeader'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import { Grid, makeStyles, Container } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import AuthContext from '../Context/AuthContext'
import CreateTweet from '../Components/Tweets/CreateTweet'
import isAuth from '../utils/useAuth'
import { Switch, Route, useRouteMatch } from 'react-router'
import FollowContainer from '../Components/FollowContainer'
import CircularLoad from '../Components/CircularLoad'

const useStyles = makeStyles( theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: "75%",
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: "50%",
        }
    }
}));

export default function Profile() {
    const classes = useStyles()
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [tweetArr,setTweetArr] = useState([])
    const [content, updateContent] = useState('')
    const { handle } = useParams()
    const {auth, setAuth} = useContext(AuthContext)
    let { path } = useRouteMatch();


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

    const editProfileAPI = async(name, username, description) => {
        await fetch('http://localhost:8000/users',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                name: name,
                description: description
            })
        })

        if(username == user.username){
            history.go(0)
        }
        else{
            history.push(`/users/${username}`)
        }
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

    console.log(path)

    return (
    <>
    {user == null ? <CircularLoad/> : 
            (<Container className={classes.root}>
            <Grid container direction="column" spacing={0} >
                <Navbar />
                <ProfileHeader 
                    name={user.name} 
                    username={user.username}
                    description={user.description}
                    followers={user.followers}
                    following={user.following}
                    editProfileAPI={editProfileAPI}
                />
                <Switch>
                    <Route exact path={path}>
                        {auth && <CreateTweet 
                            content={content} 
                            updateContent={updateContent}
                            createTweetAPI={createTweetAPI}
                            />}
                        <Feed 
                            tweetArr={tweetArr}
                            setTweetArr={setTweetArr}
                        />
                    </Route>
                    <Route exact path={`${path}/:type`}>
                        <FollowContainer userForContainer={user.username}/>
                    </Route>
                </Switch>
            </Grid>
        </Container >)}
    </>
    )
}
