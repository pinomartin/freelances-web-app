import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import  ProjectCard  from "./ProjectCard";
import SpinnerLoader from "./SpinnerLoader";
import AddProjectButton from "./AddProjectButton";
import WelcomeNewUser  from './WelcomeNewUser';
import { FreelancesContext } from '../context/FreelancesProvider';

const ProjectsList = ({ history }: RouteComponentProps<any>) => {
  // const [usuario, setUsuario] = useState<any | null>(null);
  // const [projects, setProjects] = useState<any>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const { projects: contextProjects, userDB, authUser } = useContext(FreelancesContext)

  // const getUserFromDB = async (uid: string | any) => {
  //   const dbUser = await db.collection("users").doc(uid).get();
  //   setUsuario(dbUser.data());
  // };
  console.log(contextProjects);

  // const getProjectsFromUser = async (userId: string | any) => {
  //   const userprojects: any = await db
  //     .collection("projects")
  //     .where("userId", "==", userId)
  //     .orderBy("creationDate", "desc")
  //     .get();
  //   const userprojectsData = await userprojects.docs.map((doc: any) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setIsLoaderVisible(false);
  //   setProjects(userprojectsData);
  // };

  useEffect(() => {
    setIsLoaderVisible(true);
    if (authUser) {
      setIsLoaderVisible(false);
      console.log(contextProjects);
    } else {
      console.log("No existe Usuario");
      history.push("/login");
    }
  }, [authUser, history]);

  return (
    <div className="container">
      {isLoaderVisible ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className="row">
            <div className="col-12 text-center mt-2">
              <h2>Mis Proyectos</h2>
              {userDB && <h4>Bienvenido {userDB.displayName} !! </h4>}
              
            </div>
          </div>
          <div className="row justify-content-center d-block text-center mt-3">
                  <button className="btn btn-primary ">Activos</button>
                  <button className="btn btn-secondary m-0 ">Terminados</button>
              </div>
              <br />
          <div className="row justify-content-center align-items-center bg-transparent">
            {contextProjects !== [] ? contextProjects.map((item: any, index:number) => (
              <>
              
              <ProjectCard data={item} key={index} />
              </>
            )) : <WelcomeNewUser/>}
            
            <AddProjectButton />
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(ProjectsList);
