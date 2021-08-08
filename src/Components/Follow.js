import React from 'react'
import { Paper, makeStyles, Avatar, Typography, Grid, Box} from '@material-ui/core'
import FollowButton from './FollowButton';
import { useHistory } from 'react-router';

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


export default function Follow({ user, size=1}) {

    const history = useHistory()
    const classes = useStyles()
    return (
        <Paper 
            className={classes.root} 
            square 
            elevation={0}
            variant="outlined"
            onClick={(e) => history.push('/users/'+user.username)}
            >
            <Grid container direction="row">
                <Grid>
                    <Box m={1}><Avatar></Avatar></Box>
                </Grid>
                <Grid>
                    <Box m={1}>
                        <Typography variant="body1" >{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{'@'+user.username}</Typography>
                    </Box>
                </Grid>
                <Grid className={classes.pushRight}>
                    <Box m={1}><FollowButton username={user.username} follow={user.follow}/></Box>
                </Grid>
                {size==1 ? <Grid item xs={12}>
                    <Typography variant="body2">{user.description}</Typography>
                </Grid> : <></>}
            </Grid>
        </Paper>
    )
}
