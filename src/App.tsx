import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import Home from "./components/Home";


function App() {
  // interface UserData {
  //   username: string;
  //   password: string;
  //   prevState: null
  // }
  
  // //...
  // const [user, setUser] = useState<UserData | null>(null);

  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      user !== null ? setFirebaseUser(user) : setFirebaseUser(null);
    });
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container-fluid">
        <NavBar firebaseUserActive={firebaseUser} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>...Loading</p>
  );
}

export default App;
