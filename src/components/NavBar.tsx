import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import MainLogo from "../assets/mainLogoTransparent.svg";
import DefaultProfilePhoto from "../assets/defaultProfilePhoto.png";
import { FreelancesContext } from '../context/FreelancesProvider';
import { useContext } from "react";


const NavBar = ({ history }: RouteComponentProps<any>) => {

  const { authUser, userSignOut } = useContext(FreelancesContext);


  // console.log('ANTERIOR',firebaseUserActive);
  // console.log('Context',authUser);

  return (
    <div className="navbar navbar-dark bg-dark sticky-top">
      <NavLink className="navbar-brand NavBar__navBarBrand" to="/" exact>
        <img src={MainLogo} alt="MainAppLogo" width="120" />
      </NavLink>
        <div className="d-flex">
          {authUser !== null ? (
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
                  {authUser.displayName ? (<small className="m-2 primaryFontColor"><strong>{authUser.displayName}</strong></small>) : null}
                  {authUser.photoURL ? (<img src={authUser.photoURL} className="img-rounded" alt="userProfilePhoto" width="25px"></img>) : <img src={DefaultProfilePhoto} className="img-rounded" alt="userProfilePhoto" width="25px"></img>}
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
                    onClick={() => userSignOut().then(history.push('/login'))}
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
