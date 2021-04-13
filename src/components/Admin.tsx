import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ProjectListItem } from "./ProjectListItem";

const Admin = ({ history }: RouteComponentProps<any>) => {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [projects, setProjects] = useState<any>([]);

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
      <div className="row">
        <div className="col-12 text-center">
          <h2>Admin Ruta Protegida</h2>
          {usuario && <h4>Bienvenido {usuario.userName} !! </h4>}
        </div>
      </div>
      <div className="row justify-content-center bg-white">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4">
              {projects.map((item: any, index: number) => (
                <ProjectListItem data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Admin);
