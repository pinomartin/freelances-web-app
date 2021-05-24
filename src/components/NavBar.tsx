import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import MainLogo from "../assets/mainLogoTransparent.svg";
import DefaultProfilePhoto from "../assets/defaultProfilePhoto.png";

interface IProps extends RouteComponentProps<any> {
  firebaseUserActive: {
    photoURL:string;
    displayName:string;
  };
}

const NavBar = ({ firebaseUserActive, history }: IProps) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="navbar navbar-dark bg-dark sticky-top">
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
                  {firebaseUserActive.displayName ? (<small className="m-2 primaryFontColor"><strong>{firebaseUserActive.displayName}</strong></small>) : null}
                  {firebaseUserActive.photoURL ? (<img src={firebaseUserActive.photoURL} className="img-rounded" alt="userProfilePhoto" width="25px"></img>) : <img src={DefaultProfilePhoto} className="img-rounded" alt="userProfilePhoto" width="25px"></img>}
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right bg-dark"
                  aria-labelledby="dropdownMenuButton"
                >
                  <NavLink className="dropdown-item bg-dark text-white" to="/projects" exact>
                  💼 Mis Proyectos
                  </NavLink>
                  <NavLink className="dropdown-item bg-dark text-white" to="/profile">
                  👥 Mi Perfil
                  </NavLink>
                  <button
                    className="dropdown-item text-white bg-dark"
                    onClick={() => cerrarSesion()}
                  >
                    🔒 Cerrar Sesion
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
