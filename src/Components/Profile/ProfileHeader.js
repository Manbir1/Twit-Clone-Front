import React, {useContext, useState} from 'react'
import { Avatar, Paper, Grid, Typography, Button, Box, makeStyles} from '@material-ui/core'
import AuthContext from '../../Context/AuthContext'
import EditProfile from './EditProfile';
import FollowButton from '../FollowButton';
import { useHistory, useRouteMatch } from 'react-router';

const useStyles = makeStyles({
    onHover: {
        "&:hover": {
            cursor: "pointer"
        }
    }
});

export default function ProfileHeader({name, username, avatar, description, followers, following, editProfileAPI}) {
    const { auth } = useContext(AuthContext)
    const classes = useStyles()
    const [openEdit, setEdit] = useState(false)
    const { url } = useRouteMatch()
    const history = useHistory()

    const onSignout = async (e) => {
        await fetch(`http://localhost:8000/users/action/signout`,{
                method: 'GET',
                credentials: 'include',
        })
        history.push('/login')
    }

    return (
        <Paper variant="outlined" elevation={0} xs={12} square={true}>
            <EditProfile open={openEdit} setOpen={setEdit} name={name} username={username} description={description} editProfileAPI={editProfileAPI}/>
            <Box m={3}>
                <Grid container direction="column" >
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid>
                            <Avatar>H</Avatar>
                        </Grid>
                        <Grid>
                            {auth && 
                            <>
                                <FollowButton username={username}/>
                                <Button variant="outlined" color="primary" onClick={(e) => setEdit(true)}>Edit Profile</Button>
                                <Button variant="outlined" color="secondary" onClick={onSignout}>Sign Out</Button>
                            </>
                            }
                        </Grid>
                    </Grid> 
                    <Grid item>
                        <Typography>
                            {name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" >
                            {'@'+username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                        <Grid item>
                            <Typography className={classes.onHover} onClick={(e) => history.push(`${url}/followers`)}>
                                <strong> {followers} </strong> Followers
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.onHover} onClick={(e) => history.push(`${url}/following`)}>
                                <strong>{following} </strong> Following
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}
