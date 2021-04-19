import React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import MainLogo from "../assets/mainLogoTransparent.svg";

interface IProps extends RouteComponentProps<any> {
  firebaseUserActive: {
    photoURL:string;
  };
}

const NavBar = ({ firebaseUserActive, history }: IProps) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <NavLink className="navbar-brand NavBar__navBarBrand" to="/" exact>
        <img src={MainLogo} alt="MainAppLogo" width="120" />
      </NavLink>
        <div className="d-flex">
          {firebaseUserActive !== null ? (
            <>
              <div className="dropdown">
                <button
                  className="btn btn-transparent text-white"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  
                  {firebaseUserActive.photoURL ? (<img src={firebaseUserActive.photoURL} className="img-rounded" alt="userProfilePhoto" width="30px"></img>) : 'Menu'}
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <NavLink className="dropdown-item bg-dark text-white" to="/admin" exact>
                    Admin
                  </NavLink>
                  <NavLink className="dropdown-item bg-dark" to="">
                    Perfil
                  </NavLink>
                  <button
                    className="dropdown-item bg-danger"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesion
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NavLink className="btn btn-dark" to="/login" exact>
              Iniciar Sesión
            </NavLink>
          )}
        </div>
      </div>
    
  );
};

export default withRouter(NavBar);
