import React from "react";
import {
  NavLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { auth } from "../firebase";
import MainLogo from "../assets/mainLogoTransparent.svg";

interface IProps extends RouteComponentProps<any> {
  firebaseUserActive?: object;
}

const NavBar = ({ firebaseUserActive, history }: IProps) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <NavLink className="navbar-brand NavBar__navBarBrand__hover" to="/" exact>
        <img src={MainLogo} alt="" width={150} />
      </NavLink>
      <div>
        <div className="d-flex">
          {firebaseUserActive !== null ? (
            <NavLink className="btn btn-dark mr-2" to="/admin" exact>
              Admin
            </NavLink>
          ) : null}

          {firebaseUserActive !== null ? (
            <button className="btn btn-dark" onClick={() => cerrarSesion()}>
              Cerrar Sesion
            </button>
          ) : (
            <NavLink className="btn btn-dark mr-2" to="/login" exact>
              Iniciar Sesión
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
