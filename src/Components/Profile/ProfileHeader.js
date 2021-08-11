import React, {useContext, useState} from 'react'
import { Avatar, Paper, Grid, Typography, Button, Box, makeStyles} from '@material-ui/core'
import AuthContext from '../../Context/AuthContext'
import EditProfile from './EditProfile';
import FollowButton from '../FollowButton';
import { useHistory, useRouteMatch } from 'react-router';
import UserContext from '../../Context/UserContext';

const useStyles = makeStyles((theme) => ({
    onHover: {
        "&:hover": {
            cursor: "pointer"
        }
    },

    avatar: {
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(15),
            height: theme.spacing(15)
        },
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(10),
            height: theme.spacing(10)
        },
    }
}));

export default function ProfileHeader({name, username, avatar, description, followers, following, editProfileAPI, followStatus}) {
    const { auth } = useContext(AuthContext)
    const sessionUser = useContext(UserContext).user
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

    const onProfileClick = async(e) => {
        e.stopPropagation()
        history.push(`/users/${username}`)
    }

    console.log(followStatus)

    return (
        <Paper variant="outlined" elevation={0} xs={12} square={true}>
            <EditProfile open={openEdit} setOpen={setEdit} name={name} username={username} description={description} editProfileAPI={editProfileAPI}/>
            <Box m={3}>
                <Grid container direction="column" >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid className={classes.onHover} onClick={onProfileClick}>
                            <Box m={1}>
                                <Avatar className={classes.avatar}></Avatar>
                            </Box>
                        </Grid>
                        <Grid>
                            {auth && 
                            <>
                                { sessionUser != username
                                    ?<FollowButton username={username} follow={followStatus}/>
                                    :<>
                                    <Button variant="outlined" color="secondary" onClick={onSignout}>Sign Out</Button>
                                    <Button variant="outlined" color="primary" onClick={(e) => setEdit(true)}>Edit Profile</Button>
                                    </>
                                }
                            </>
                            }
                        </Grid>
                    </Grid> 
                    <Grid item>
                        <Typography variant="body1">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary"className={classes.onHover} onClick={onProfileClick}>
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
