import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions, makeStyles, Box, Grid} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RepeatIcon from '@material-ui/icons/Repeat';
import AuthContext from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';

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

export default function Tweet({ tweet, id, onDelete = null, liked = false }) {
    const classes = useStyles()
    const { auth } = useContext(AuthContext)
    const history = useHistory()

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

        const like = (await ret.json()).like
    }

    const onTweetClick = async() => {
        history.push(`${tweet.username}/status/${id}`)
    }

    return (
            <Card className={classes.cardS} variant="outlined" elevation={3} square={true} onClick={onTweetClick}>
                <Box p={1}>
                    <CardHeader 
                        title = {tweet.name}
                        titleTypographyProps={{variant:'title' }}
                        subheader = {'@'+tweet.username + ' ' + tweet.date}
                        action={
                            auth && (
                            <IconButton aria-label="delete tweet">
                            <DeleteIcon onClick={(e) => onTweetDelete(e)}/>
                            </IconButton>
                            )
                        }
                    />
                    <CardContent>
                        <Typography>
                            {tweet.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                        >
                            <Grid className={classes.item}>
                                <IconButton>
                                    <ChatBubbleIcon /> 
                                </IconButton>
                                <Typography>
                                    {tweet.comments}
                                </Typography>
                            </Grid>

                            <Grid className={classes.item}>
                                <IconButton>
                                    <RepeatIcon />
                                </IconButton>
                                <Typography>
                                    {tweet.shares}
                                </Typography>
                            </Grid>
                            <Grid className={classes.item}>
                                <IconButton onClick={(e) => onTweetLike(e)}>
                                    <FavoriteIcon color={liked ? "secondary" : ""}/>
                                </IconButton> 
                                <Typography>
                                    {tweet.likes}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Box>
            </Card>
    )
}
