import React, { useState } from 'react';
import Signup from './Pages/SignUp'
import Login from './Pages/Login'
import Profile from './Pages/Profile.js'
import NoMatch from './Pages/NoMatch';
import { CssBaseline } from '@material-ui/core'
import AuthContext from './Context/AuthContext'
import UserContext from './Context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  const [auth, setAuth] = useState(false)
  const providerValue = {
    auth,
    setAuth
  };

  const [user, setUser] = useState('')
  const userProviderValue = {
    user,
    setUser
  }

  return (
    <Router>
      <CssBaseline />
      <AuthContext.Provider value={providerValue}>
        <UserContext.Provider value={userProviderValue}>
          <Switch>
              <Route path="/users/:handle" children={<Profile />} />
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </UserContext.Provider>
        </AuthContext.Provider>
    </Router>
  );
}

export default App;
