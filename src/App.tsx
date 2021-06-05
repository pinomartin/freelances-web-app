import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProjectsList from "./components/ProjectsList";
import Home from "./components/Home";
import NewProjectForm from "./components/NewProjectForm";
import UserProfile from "./components/UserProfile";
import ProjectScreen from "./components/ProjectScreen";
import { FreelancesContext } from './context/FreelancesProvider';

function App() {


  const { authUser } = useContext(FreelancesContext);

  return (
    <Router>
      <NavBar />
      <div className="container-fluid p-0">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login firebaseUserActive={authUser} />
          </Route>
          <Route path="/projects/:id" exact>
            <ProjectScreen firebaseUserActive={authUser} />
          </Route>
          <Route path="/projects">
            <ProjectsList />
          </Route>
          <Route path="/newproject">
            <NewProjectForm />
          </Route>
          <Route path="/profile" exact>
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
