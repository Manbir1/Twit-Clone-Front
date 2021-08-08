import React, { useEffect, useState } from 'react'
import Feed from '../Components/Feed'
import CircularLoad from '../Components/Utils/CircularLoad'
import { Grid } from '@material-ui/core'
import CreateTweet from '../Components/Tweets/CreateTweet'
import SideBar from '../Components/Sidebars/SideBar'
import UtilsBar from '../Components/Sidebars/UtilsBar'

export default function Home() {

    const [tweetArr, setTweetArr] = useState(null)

    useEffect(function handleAPI(){
        (async() => {
            const API_INF = await (await fetch(`http://localhost:8000/timeline`,{
                method: 'GET',
                credentials: 'include',
            })).json()
            setTweetArr(API_INF)
        })()
    },[])

    return(
    <Grid container>
        <Grid item xs={0} md={3}>
            <SideBar />
        </Grid>
        <Grid item xs={12} md={6}>
            <CreateTweet />
            {
                tweetArr==null
                ? <CircularLoad />
                : <Feed tweetArr={tweetArr} setTweetArr={setTweetArr}/>

            }
        </Grid>
        <Grid item xs={0} md={3}>

        </Grid>
    </Grid>
    )
}
