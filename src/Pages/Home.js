import React, { useEffect, useState } from 'react'
import Feed from '../Components/Feed'
import CircularLoad from '../Components/Utils/CircularLoad'
import CreateTweet from '../Components/Tweets/CreateTweet'
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
        <>
            <CreateTweet />
            {
                tweetArr==null
                ? <CircularLoad />
                : <Feed tweetArr={tweetArr} setTweetArr={setTweetArr}/>

            }
        </>
    )
}
