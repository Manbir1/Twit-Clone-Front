import React from 'react'
import Tweet from './Tweets/Tweet'

export default function Feed({ tweetArr, setTweetArr}) {

    const changeOnDelete = (id) => {
        console.log("helo")
        setTweetArr(tweetArr.filter(tweet => tweet.id!=id))
    }

    return (
        <>
            {tweetArr.map(tweet => (
                <Tweet 
                    key={tweet.id} 
                    id={tweet.id} 
                    tweet={tweet} 
                    onDelete={changeOnDelete}
                    liked={true}
                    />
            ))}
        </>
    )
}
