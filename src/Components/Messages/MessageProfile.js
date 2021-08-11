import React from 'react'
import { Paper, makeStyles, Avatar, Typography, Grid, Box} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        minWidth: "95%",
        maxWidth: "100%",
        padding: "10px",
        '&:hover': {
            background: "#FAFAFA",
            cursor: "pointer"
         },
    },
    pushRight: {
        marginLeft: "auto"
    },
  });


export default function MessageProfile({ name, username, setPage, id }) {
    const classes = useStyles()
    return (
        <Paper 
            className={classes.root} 
            square 
            elevation={0}
            onClick={(e) => {setPage(id)}}
            >
            <Grid container direction="row">
                <Grid item>
                    <Box m={1}><Avatar></Avatar></Box>
                </Grid>
                <Grid item>
                    <Box m={1}>
                        <Typography variant="body1" >{name}</Typography>
                        <Typography variant="body2" color="textSecondary">{'@'+username}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
