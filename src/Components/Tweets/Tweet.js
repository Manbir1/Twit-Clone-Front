import React from 'react'
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions, makeStyles} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RepeatIcon from '@material-ui/icons/Repeat';

const useStyles = makeStyles({
    cardS: {
        maxWidth: "100%",
    },
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

export default function Tweet({ tweet }) {
    const classes = useStyles()

    return (
            <Card className={classes.cardS} variant="outlined">
                <CardHeader 
                    title = {tweet.name}
                    subheader = {'@'+tweet.username + ' ' + tweet.date}
                />
                <CardContent>
                    <Typography>
                        {tweet.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <ChatBubbleIcon /> 
                    </IconButton>
                    <Typography>
                        {tweet.comments}
                    </Typography>

                    <IconButton>
                        <RepeatIcon />
                    </IconButton>
                    <Typography>
                        {tweet.shares}
                    </Typography>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton> 
                    <Typography>
                        {tweet.likes}
                    </Typography>
                </CardActions>
            </Card>
    )
}
