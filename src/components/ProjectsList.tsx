import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import  ProjectCard  from "./ProjectCard";
import SpinnerLoader from "./SpinnerLoader";
import AddProjectButton from "./AddProjectButton";
import WelcomeNewUser  from './WelcomeNewUser';

const ProjectsList = ({ history }: RouteComponentProps<any>) => {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [projects, setProjects] = useState<any>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const getUserFromDB = async (uid: string | any) => {
    const dbUser = await db.collection("users").doc(uid).get();
    setUsuario(dbUser.data());
  };

  const getProjectsFromUser = async (userId: string | any) => {
    const userprojects: any = await db
      .collection("projects")
      .where("userId", "==", userId)
      .orderBy("creationDate", "desc")
      .get();
    const userprojectsData = await userprojects.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIsLoaderVisible(false);
    setProjects(userprojectsData);
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserFromDB(auth.currentUser.email);
      getProjectsFromUser(auth.currentUser.email);
    } else {
      console.log("No existe Usuario");
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="container">
      {isLoaderVisible ? (
        <SpinnerLoader />
      ) : (
        <>
          <div className="row">
            <div className="col-12 text-center mt-2">
              <h2>Mis Proyectos</h2>
              {usuario && <h4>Bienvenido {usuario.userName} !! </h4>}
              
            </div>
          </div>
          <div className="row justify-content-center d-block text-center mt-3">
                  <button className="btn btn-primary ">Activos</button>
                  <button className="btn btn-secondary m-0 ">Terminados</button>
              </div>
              <br />
          <div className="row justify-content-center align-items-center bg-transparent">
            {projects.length !== 0 ? projects.map((item: any, index:number) => (
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
