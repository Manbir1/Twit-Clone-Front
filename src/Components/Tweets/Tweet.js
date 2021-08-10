import React, { useContext, useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardMedia,Typography, IconButton, CardActions, makeStyles, Box, Grid, Avatar, Divider} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RepeatIcon from '@material-ui/icons/Repeat';
import AuthContext from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const useStyles = makeStyles({
    cardS: {
        maxWidth: "100%",
        '&:hover': {
            background: "#FAFAFA",
            cursor: "pointer"
         },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    btText: {
        color: "gray"
    }
  });

/* 

tweet = {
    name: String
    username: String
    date: new Date()
    content: String
    comments: Int
    shares: Int
    Likes: Int
}

*/

export default function Tweet({ tweet, id, onDelete = null, likedProp = false, sharedProp = false, size = 0}) {
    const classes = useStyles()
    const { auth } = useContext(AuthContext)
    const { user } = useContext(UserContext)
    const history = useHistory()
    const [liked, setLiked] = useState(likedProp)
    const [likes, setLikes] = useState(tweet.likes)

    useEffect(function getLikeSession(){
        (async() => {
            const obj = await (await fetch(`http://localhost:8000/tweet/is_liked`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    tweet_id: id
                })
            })).json()
            setLiked(obj.status)
        })()
    },[])

    const onTweetDelete = async(e) => {
        e.stopPropagation()
        const ret = await fetch(`http://localhost:8000/tweet`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                tweetId: id
            })
        })

        if( onDelete != null && ret.status===200){
            onDelete(id)
        }
    }

    const onTweetLike = async(e) => {
        e.stopPropagation()
        const ret = await fetch(`http://localhost:8000/tweet/likes`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                tweetId: id
            })
        })

        const likeRes = (await ret.json()).like
        likeRes ? setLikes(Number(likes)+1) : setLikes(Number(likes)-1)
        setLiked(likeRes)
    }

    const onTweetShare = async(e) => {
        e.stopPropagation()
        const ret = await fetch(`http://localhost:8000/tweet/share`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                tweet_id: id
            })
        })

        const share = (await ret.json()).share 
    }

    const onTweetClick = async() => {
        history.push(`/users/${tweet.username}/status/${id}`)
    }

    return (
            <Card className={classes.cardS} variant="outlined" elevation={3} square={true} onClick={onTweetClick}>
                <Box p={1}>
                    <CardHeader 
                        title = {tweet.name}
                        titleTypographyProps={{variant:'title' }}
                        subheader = {'@'+tweet.username + ' ' + tweet.date}
                        avatar={<Avatar></Avatar>}
                        action={
                             user==tweet.username && auth && (
                            <IconButton aria-label="delete tweet">
                            <DeleteIcon onClick={(e) => onTweetDelete(e)}/>
                            </IconButton>
                            )
                        }
                    />
                    <CardContent>
                        <Typography variant={size == 0 ? "body1" : "h5"}>
                            {tweet.content}
                        </Typography>
                    </CardContent>
                    <CardMedia />
                    {size == 1 
                    ?
                    <>
                    <Divider />
                        <div style={{display: "flex", justifyContent: "flex-start", marginTop: "10px", marginBottom: "10px"}}>
                            <Box ml={2} mr={2}>
                                <Typography variant="subtitle1"><strong>{tweet.comments}</strong> Comments</Typography>
                            </Box>
                            <Box ml={2} mr={2}>
                                <Typography variant="subtitle1"><strong>{tweet.shares}</strong> Retweets</Typography>
                            </Box>
                            <Box ml={2} mr={2}>
                                <Typography variant="subtitle1"><strong>{tweet.likes}</strong> Likes</Typography>
                            </Box>
                        </div>
                    <Divider />
                    </>
                    : <></>}
                    <CardActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Grid className={classes.item}>
                                <IconButton>
                                    <ChatBubbleIcon fontSize={size == 0 ? "small" : "medium"} /> 
                                </IconButton>
                                <Typography>
                                    {size == 0 && tweet.comments}
                                </Typography>
                            </Grid>

                            <Grid className={classes.item}>
                                <IconButton>
                                    <RepeatIcon fontSize={size == 0 ? "small" : "medium"}  onClick={onTweetShare}/>
                                </IconButton>
                                <Typography>
                                    {size == 0 && tweet.shares}
                                </Typography>
                            </Grid>
                            <Grid className={classes.item}>
                                <IconButton onClick={(e) => onTweetLike(e)}>
                                    { liked ? <FavoriteIcon fontSize={size == 0 ? "small" : "medium"} color={liked ? "secondary" : ""}/> : <FavoriteBorderIcon fontSize={size == 0 ? "small" : "medium"} />}
                                </IconButton> 
                                <Typography>
                                    {size == 0 && likes}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Box>
            </Card>
    )
}
