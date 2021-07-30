import React, { useState, useEffect } from 'react'
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
export default function EditForm( {nameProp, usernameProp, descriptionProp, editProfileAPI}) {
    const classes = useStyles()
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [description, setDescription] = useState('')

    useEffect(function editOnMount(){
        setName(nameProp)
        setUsername(usernameProp)
        setDescription(descriptionProp)
    }, [nameProp,usernameProp,descriptionProp])

    return (
        <Box p={3}>
            <form noValidate>
                <Grid 
                    container
                    direction="row"
                >
                    <Grid item xs={12} md ={5} className={classes.GridItem}>
                        <TextField margin="none" label="Name" fullWidth defaultValue={name} value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </Grid>
                    <Grid item xs={12} md = {6} className={classes.pushRight}>
                        <TextField margin="none" label="Username" fullWidth defaultValue={username} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.GridItem}>
                        <TextField
                            label="Bio Description"
                            multiline
                            maxRows={4}
                            fullWidth
                            margin="normal"
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    {/* Add Avatar */}
                    <Box mt={5}>
                        <Button onClick={(e) => editProfileAPI(name,username,description)}>Save Changes</Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    )
}
