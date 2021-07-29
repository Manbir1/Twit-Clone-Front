import React, { useState } from 'react';
import Signup from './Pages/SignUp'
import Login from './Pages/Login'
import Profile from './Pages/Profile.js'
import NoMatch from './Pages/NoMatch';
import { CssBaseline } from '@material-ui/core'
import AuthContext from './Context/AuthContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import EditProfile from './Components/Profile/EditProfile';

function App() {
  const [auth, setAuth] = useState(false)
  const providerValue = {
    auth,
    setAuth
  };
  return (
    <Router>
      <CssBaseline />
      <AuthContext.Provider value={providerValue}>
        <Switch>
            <Route exact path="/users/:handle" children={<Profile />} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <EditProfile />
            </Route>
          </Switch>
        </AuthContext.Provider>
    </Router>
  );
}

export default App;
