import React, { useState} from 'react'
import { Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    followBtn:{
        borderRadius: "20px"
    }
});


export default function FollowButton( { username, follow=false } ) {

    const classes = useStyles()
    const [followState, updateFollow] = useState(follow)

    const followOnClick = async(e) =>
    {
        e.stopPropagation()
        const newFollow = await (await fetch('http://localhost:8000/follow',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: username
            })
        })).json()

        updateFollow(newFollow.follow)
        console.log(newFollow)

    }

    return (
        <Button 
            variant="outlined" 
            color={!followState ? "primary" : "secondary"} 
            onClick={followOnClick}
            size="medium"
            className={classes.followBtn}
            >
                {!followState ? "Follow" : "Unfollow" }
            </Button>
    )
}
