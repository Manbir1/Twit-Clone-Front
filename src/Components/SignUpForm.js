import React, { useState } from 'react'
import {TextField, Grid, Button, Container, Typography} from '@material-ui/core'

export default function SignUpForm({ onSubmit }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Container>
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '80vh' }}
                >
                <form>
                    <Grid item>
                    <Typography variant="h3" gutterBottom>
                        Sign Up
                    </Typography>
                    </Grid>
                    <Grid> 
                        <TextField 
                            variant="outlined"
                            required
                            label="First Name"
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <TextField 
                            variant="outlined"
                            required
                            label="Last Name"
                            margin="normal"
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            onChange = {(e) => setUsername(e.target.value)}
                            variant="outlined"
                            required
                            label="Username"
                            margin="normal"
                            type="text"
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField 
                            onChange = {(e) => setEmail(e.target.value)}
                            variant="outlined"
                            required
                            label="Email"
                            margin="normal"
                            type="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid >
                        <TextField 
                            onChange = {(e) => setPassword(e.target.value)}
                            variant="outlined"
                            required
                            label="Password"
                            type="password"
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <Button variant="outlined" color="primary" fullWidth type="submit" onClick = {(e) => onSubmit(e,name,username,email,password)}>
                            Sign Up
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}
