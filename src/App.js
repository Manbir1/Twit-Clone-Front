import React, { useState } from 'react';
import Signup from './Pages/SignUp'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Profile from './Pages/Profile.js'
import MainTemp from './Pages/MainTemp';
import AuthContext from './Context/AuthContext'
import UserContext from './Context/UserContext';
import MessagePage from './Pages/MessagePage';
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
      <AuthContext.Provider value={providerValue}>
        <UserContext.Provider value={userProviderValue}>
          <Switch>
              <Route path="/users/:handle">
                <MainTemp>
                  <Profile /> 
                </MainTemp>
              </Route>
              <Route path="/messages">
                <MainTemp>
                  <MessagePage />
                </MainTemp>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route path="*">
                <MainTemp>
                  <Home />
                </MainTemp>
              </Route>
            </Switch>

          </UserContext.Provider>
        </AuthContext.Provider>
    </Router>
  );
}

export default App;
