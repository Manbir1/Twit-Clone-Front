import React, {useContext} from 'react'
import { Avatar, Paper, Grid, Typography, Button, Container} from '@material-ui/core'
import AuthContext from '../../Context/AuthContext'


export default function ProfileHeader({name, username, avatar, description, followers, following, followOnClick}) {
    const {auth, _} = useContext(AuthContext)
    console.log(auth)
    return (
        <Paper variant="outlined" elevation={0} xs={12}>
            <Container>
                <Grid container direction="column">
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid>
                            <Avatar>H</Avatar>
                        </Grid>
                        <Grid>
                            {auth && 
                            <>
                                <Button variant="outlined" color="primary" onClick={followOnClick}>Follow</Button>
                                <Button variant="outlined" color="primary">Edit Profile</Button>
                            </>
                            }
                        </Grid>
                    </Grid> 
                    <Grid item>
                        <Typography>
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
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
                            <Typography>
                                Followers: {followers}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Following: {following}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}
