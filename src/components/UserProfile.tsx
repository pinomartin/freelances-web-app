import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { getUserFromDB } from "../firebaseUtils/getFirestoreData";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (auth.currentUser) {
      getUserFromDB(auth.currentUser?.email).then((user) => setUser(user));
    } else {
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="row justify-content-center align-content-center mt-5">
      <div className="col-3 bg-dark userProfileCard__container">
        <div className="row justify-content-center">
          <img
            src={user.profilePhotoURL}
            alt=""
            width="100px"
            onClick={() => {}}
          />
        </div>
        <div className="row justify-content-center">
          <p>{user.userName}</p>
        </div>
        <div className="row justify-content-center">
          <p>{user.email}</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center">Activos</div>
          <div className="col-4 text-center">Terminados</div>
          <div className="col-4 text-center">Totales</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
