import React, { useState } from 'react'
import { Button } from '@material-ui/core'

export default function FollowButton( { username, follow } ) {

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
        <Button variant="outlined" color={!followState ? "primary" : "secondary"} onClick={followOnClick}>{!followState ? "Follow" : "Unfollow" }</Button>
    )
}
