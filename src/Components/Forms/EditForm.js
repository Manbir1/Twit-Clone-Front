import React from 'react'
import { Grid, Box, Typography, TextField, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles({
    GridItem: {
        margin: "5px"
    },
    pushRight: {
        marginLeft:"auto",
        margin: "5px"
    }
});
export default function EditForm( {name, username, description}) {
    const classes = useStyles()

    const editFormOnSubmit = (e) => {

    }

    return (
        <Box p={3}>
            <form noValidate>
                <Grid 
                    container
                    direction="row"
                >
                    <Grid item xs={12} md ={5} className={classes.GridItem}>
                        <TextField margin="none" label="Name" fullWidth defaultValue={name}/>
                    </Grid>
                    <Grid item xs={12} md = {6} className={classes.pushRight}>
                        <TextField margin="none" label="Username" fullWidth defaultValue={username}/>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.GridItem}>
                        <TextField
                            label="Bio Description"
                            multiline
                            maxRows={4}
                            fullWidth
                            margin="normal"
                            defaultValue={description}
                        />
                    </Grid>
                    {/* Add Avatar */}
                    <Box mt={5}>
                        <Button>Save Changes</Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    )
}
