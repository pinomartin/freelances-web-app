import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import SpinnerLoader from "./SpinnerLoader";
import AddProjectButton from "./AddProjectButton";

const Admin = ({ history }: RouteComponentProps<any>) => {
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
      .get();
    const userprojectsData = await userprojects.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIsLoaderVisible(false);
    console.log(userprojectsData);
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
            <div className="col-12 text-center">
              <h2>Admin Ruta Protegida</h2>
              {usuario && <h4>Bienvenido {usuario.userName} !! </h4>}
            </div>
          </div>
          <div className="row justify-content-between align-items-center bg-transparent">
            {projects.map((item: any, index: number) => (
              <ProjectCard data={item} key={index} />
            ))}
            <AddProjectButton />
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Admin);
