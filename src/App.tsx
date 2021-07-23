import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProjectsList from "./components/ProjectsList";
import Home from "./components/Home";
import NewProjectForm from "./components/NewProjectForm";
import UserProfile from "./components/UserProfile";
import ProjectScreen from "./components/ProjectScreen";
import ProjectReport from "./components/ProjectReport";
import TermsConditions from "./components/TermsConditions";
import Help from "./components/Help";
import ResetPassword from "./components/ResetPassword";
import UserSpecs from "./components/UserSpecs";
import ProjectDataDetails from "./components/ProjectDataDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/resetPassword">
          <ResetPassword />
        </Route>
        <div className="container-fluid p-0">
          <NavBar />
          <Route path="/projects/:id" exact>
            <ProjectScreen />
          </Route>
          <Route path="/projects" exact>
            <ProjectsList />
          </Route>
          <Route path="/projreport">
            <ProjectReport />
          </Route>
          <Route path="/newproject">
            <NewProjectForm />
          </Route>
          <Route path="/projectDetails" exact>
            <ProjectDataDetails />
          </Route>
          <Route path="/userSpecs" exact>
            <UserSpecs />
          </Route>
          <Route path="/profile" exact>
            <UserProfile />
          </Route>
          <Route path="/terms" exact>
            <TermsConditions />
          </Route>
          <Route path="/help" exact>
            <Help />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
