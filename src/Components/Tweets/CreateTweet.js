import React from 'react'
import ImageIcon from '@material-ui/icons/Image';
import { TextField, Paper, IconButton, Button, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: "95%",
        maxWidth: "100%"
    },
    grid: {
        maxWidth: "100%"
    }
  });


export default function CreateTweet({content, updateContent, createTweetAPI}) {
    const classes = useStyles()

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
                            fullWidth
                            onChange={(e) => updateContent(e.target.value)}
                            placeholder="What's happening?"
                            value={content}
                        />
                    </Grid>
                    <Grid item className={classes.root}>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid>
                                <IconButton>
                                    <ImageIcon />
                                </IconButton>
                            </Grid>
                            <Grid>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick = { (e) => createTweetAPI(e, content, updateContent)}
                                >
                                    Tweet
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Paper>
    )
}
