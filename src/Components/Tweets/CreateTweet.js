import React, { useState } from 'react'
import ImageIcon from '@material-ui/icons/Image';
import { TextField, Paper, IconButton, Button, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: "75%",
        maxWidth: "100%"
    },
    grid: {
        maxWidth: "100%"
    }
  });


export default function CreateTweet() {
    const classes = useStyles()
    const [content, updateContent] = useState('')

    const createTweetAPI = async (e) => {
        // API call to backend to create user
        e.preventDefault();

        const resJSON = await fetch('http://localhost:8000/tweet/createTweet',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                content: content
            })
        })

        const res = await resJSON.json()

        updateContent('')
    }

    return (
        <Paper variant="outlined" elevation={0} xs={12} className={classes.root}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={3}
                    className={classes.root}
                >
                    <Grid item className={classes.root}>
                        <TextField
                            label="Tweet"
                            multiline
                            rows={4}
                            fullWidth
                            onChange={(e) => updateContent(e.target.value)}
                            value={content}
                        />
                    </Grid>
                    <Grid item className={classes.root}>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick = { (e) => createTweetAPI(e)}
                        >
                            Tweet
                        </Button>
                    </Grid>
                </Grid>
        </Paper>
    )
}
