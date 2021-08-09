import React from 'react'
import { Paper, IconButton, makeStyles, Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    nav: {
        width: "100%"
    }
})

export default function Navbar( { user, tweetNumb } ) {
    const classes = useStyles()
    const history = useHistory()
    return (
        <div style={{position: "sticky", top:0, zIndex: "1"}}>
            <Paper square variant="outlined" elevation={0} className={classes.nav}>
                <div style={{display: "flex", alignItems:"center"}}>
                    <IconButton aria-label="back button" onClick={e => history.go(-1)}>
                        <KeyboardBackspaceIcon color="primary"/>
                    </IconButton>
                    <div style={{ margin: "5px", marginLeft:"15px"}}>
                        <Typography variant="h6">{ user.name }</Typography>
                        <Typography variant="body2">{ tweetNumb + " Tweets"}</Typography>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
