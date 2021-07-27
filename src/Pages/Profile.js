import React, {useEffect, useState} from 'react'
import ProfileHeader from '../Components/Profile/ProfileHeader'
import Feed from '../Components/Feed'
import Navbar from '../Components/Navbar'
import { Grid, makeStyles, Container, CircularProgress } from '@material-ui/core'
import { useHistory, useParams } from 'react-router'
import CreateTweet from '../Components/Tweets/CreateTweet'

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

  /* 

user = {
  name: String
  username: String
  avatar: Image
  description: String
  followers: Int
  following: Int
}

*/

export default function Profile() {
    const classes = useStyles()
    const history = useHistory()
    const [user, setUser] = useState(null)
    const { handle } = useParams()

    useEffect(function handleApi(){
        console.log("hello");
        (async () => {
            const ret = await fetch(`http://localhost:8000/users/profile/${handle}/header`,{
            method: 'GET',
            credentials: 'include',
            })

            if(ret.status===400){
                history.push('/')
            }else{
                const user = await ret.json()
                setUser(user)
            }
        })()
    }, [handle,history])

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
                <CreateTweet />
                <Feed />
            </Grid>
        </Container >)}
    </>
    )
}
