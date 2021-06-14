import { useContext, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FreelancesContext } from "../context/FreelancesProvider";
import { getProjectsFromUser } from "../firebaseUtils/getFirestoreData";
import ProjectCard from "./ProjectCard";
import SpinnerLoader from "./SpinnerLoader";
import AddProjectButton from "./AddProjectButton";
import WelcomeNewUser from "./WelcomeNewUser";

const ProjectsList = ({ history }: RouteComponentProps<any>) => {
  // const [usuario, setUsuario] = useState<any | null>(null);
  const { userDB, authUser } = useContext(FreelancesContext);
  const [projects, setProjects] = useState<any>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  // const getUserFromDB = async (uid: string | any) => {
  //   const dbUser = await db.collection("users").doc(uid).get();
  //   setUsuario(dbUser.data());
  // };
  // console.log(contextProjects);

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
    if (authUser) {
      getProjectsFromUser(authUser.email)
        .then((projects) => {
          setProjects(projects);
          setIsLoaderVisible(false);
        })
        .catch((e) => console.log(e));
      console.log(projects);
    } else {
      history.push("/login");
    }
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {projects !== null && projects.length > 0 ? (
            <div className="row justify-content-center d-block text-center mt-3">
              <button className="btn btn-primary ">Activos</button>
              <button className="btn btn-secondary m-0 ">Terminados</button>
            </div>
          ) : null}

          <br />
          {/* <div className="row justify-content-start align-items-center bg-transparent"> */}
            <div className="card-deck">

            {
              projects !== null && projects.length > 0 ? (
                projects.map((item: any, index: number) => (
                  <>
                    <ProjectCard data={item} key={index} />
                  </>
                ))
                ) : (
                  <WelcomeNewUser />
                  )
                }
              </div>

            <AddProjectButton />
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default withRouter(ProjectsList);
