import React, {useState} from 'react'
import {TextField, Grid, Button, Container, Typography, Link, Checkbox, FormControlLabel, Box} from '@material-ui/core'
import { useHistory } from "react-router-dom";

export default function LoginForm({onFormSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    return (
        <Container component="main" maxWidth="xs">
        <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column"  style={{ minHeight: '60vh' }}>
            <Typography variant="h6" textAlign="center">
              Sign in
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange = {(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={(e) => onFormSubmit(e,email,password)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick = {(e) => history.push("/signup")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            </Box>
        </Container>
      );
}
