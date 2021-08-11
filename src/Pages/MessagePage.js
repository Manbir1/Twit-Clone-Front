import React from 'react'
import { Grid, Paper, Divider, Typography, TextField, makeStyles } from '@material-ui/core'
import MessageProfile from '../Components/Messages/MessageProfile'

const useStyles = makeStyles({
    root: {
        height: "100vh"
    },
    inputRounded: {
        [`& fieldset`]: {
            borderRadius: 20,
          },
        width: "100%",
        marginTop: "auto"
    },
    messageBox: {
        flex: 1
    }
})

const contacts = [
    {username: "mana24129", name: "Manbir Sandhu"},
    {username: "jjakes", name: "Jake Kim"},
    {username: "SamiZ", name: "Sami Zeremariam"},
]

export default function MessagePage() {
    const classes = useStyles()
    return (
        <Paper square variant="outlined" elevation={0} className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{margin: "10px"}} variant="h5">Messages</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={5}>
                    {contacts.map(elem => 
                        <> 
                            <MessageProfile name={elem.name} username={elem.username} />
                            <Divider />
                        </>
                    )}
                </Grid>
                <Divider flexItem orientation="vertical" className= {classes.root} variant="fullWidth"/>
                <Grid item sm={7} className={classes.messageBox}>
                    <TextField
                        className={classes.inputRounded}
                        placeholder="Make a message"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
