import React, { useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router';
import Tweet from '../Components/Tweets/Tweet';
import CircularLoad from '../Components/CircularLoad';
import Feed from '../Components/Feed';
import CreateTweet from '../Components/Tweets/CreateTweet';
import AuthContext from '../Context/AuthContext';

export default function TweetPage() {
    let { tweet_id } = useParams();
    const [INF, setINF] = useState(null)
    const [commentContent, setCommentContent] = useState('')
    const [commentArr, setCommentArr] = useState([])
    const { auth } = useContext(AuthContext)


    useEffect(function handleTweetAPI(){
        (async() => {
            const tweetINF = await (await fetch(`http://localhost:8000/tweet/getTweet/${tweet_id}`,{
                method: 'GET',
                credentials: 'include',
            })).json()

            console.log(tweetINF)

            setINF(tweetINF)
            setCommentArr(tweetINF.comments)

        })()
    }, [tweet_id])

    const onCommentCreate = async (e) => {
        // API call to backend to create user
        e.preventDefault();
    
        const resJSON = await fetch('http://localhost:8000/tweet',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                content: commentContent,
                parent_id: tweet_id
            })
        })
    
        const res = await resJSON.json()
    
        setCommentArr([res,...commentArr])
    
        setCommentContent('')
    } 

    if(INF == null){
        return <CircularLoad />
    }else{

    return(
        <div>
            <Tweet tweet={INF.tweet}/>
            { auth && <CreateTweet 
                createTweetAPI={onCommentCreate} 
                content={commentContent} 
                updateContent={setCommentContent}
                buttonText="Reply"
                labelValue={"Replying to " + INF.tweet.username}
                placeholderValue="Tweet your reply"
                />}
            <Feed tweetArr={commentArr}/>
        </div>
    )

    } 
}
