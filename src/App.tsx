import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import Home from "./components/Home";

function App() {
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      user !== null ? setFirebaseUser(user) : setFirebaseUser(null);
      console.log(firebaseUser);
    });
  }, [firebaseUser]);

  return (
    <Router>
      <div className="container-fluid">
        <NavBar firebaseUserActive={firebaseUser} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login firebaseUserActive={firebaseUser} />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
