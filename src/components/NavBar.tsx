import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import DefaultProfilePhoto from "../assets/defaultProfilePhoto.png";
import { FreelancesContext } from '../context/FreelancesProvider';
import FreelancesTextLogo from "../assets/freelancesTextLogo.svg";
import PaperPlaneLogo from "../assets/paperPlaneLogo.svg";
import { useContext } from "react";


const NavBar = ({ history }: RouteComponentProps<any>) => {

  const { authUser, userSignOut, userDB } = useContext(FreelancesContext);


  // console.log('ANTERIOR',firebaseUserActive);
  // console.log('Context',authUser);

  return (
    <div className="navbar navbar-dark bg-dark sticky-top">
      <NavLink className="navbar-brand NavBar__navBarBrand" to="/" exact>
        <img src={FreelancesTextLogo} alt="MainAppLogo" width="100" />
        <img src={PaperPlaneLogo} alt="MainAppLogo" width="30"/>
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
                  {userDB.userName ? (<small className="m-2 primaryFontColor"><strong>{userDB.userName}</strong></small>) : null}
                  {userDB.profilePhotoURL ? (<img src={userDB.profilePhotoURL} className="img-fluid" alt="userProfilePhoto" width="25px"></img>) : <img src={DefaultProfilePhoto} className="img-rounded" alt="userProfilePhoto" width="25px"></img>}
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
                  <NavLink className="dropdown-item bg-dark text-white" to="/help">
                  🙇‍♂️ Necesito Ayuda!
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
