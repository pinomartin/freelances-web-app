import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { getUserFromDB } from "../firebaseUtils/getFirestoreData";
import SpinnerLoader from "./SpinnerLoader";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (auth.currentUser) {
      getUserFromDB(auth.currentUser?.email).then((user) => setUser(user));
    } else {
      history.push("/login");
    }
  }, [history]);

  return user.profilePhotoURL? (
    <div className="row justify-content-center align-content-center mt-5">
      <div className="col-9 col-md-6 col-lg-4 userProfileCard__container">
        <div className="row justify-content-center m-2">
          <img
            src={user.profilePhotoURL}
            alt=""
            className="userProfileCard__image"
            width="100px"
            onClick={() => {}}
          />
        </div>
        <div className="row justify-content-center">
          <p className="p-0 m-0">{user.userName}</p>
        </div>
        <div className="row justify-content-center">
          <small>{user.email}</small>
        </div>
        <div className="row justify-content-center mt-2 bg-dark">
          <div className="col-12 text-center">
            <p className="lead">Proyectos</p>
          </div>
          <div className="col-4 text-center">
            <p>Activos</p>
            <p>0</p>
          </div>
          <div className="col-4 text-center">
            <p>Terminados</p>
            <p>0</p>
          </div>
          <div className="col-4 text-center">
            <p>Totales</p>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  ) : <SpinnerLoader />
};

export default withRouter(UserProfile);
