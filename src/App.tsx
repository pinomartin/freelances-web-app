import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin";
import Home from "./components/Home";
import NewProjectForm from "./components/NewProjectForm";
import UserProfile from "./components/UserProfile";

function App() {
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user !== null ? setFirebaseUser(user) : setFirebaseUser(null);
    });
  }, [firebaseUser]);

  return (
    <Router>
      <NavBar firebaseUserActive={firebaseUser} />
      <div className="container-fluid">
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
          <Route path="/newproject">
            <NewProjectForm />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
