import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { getUserFromDB, getProjectsFromUser } from "../firebaseUtils/getFirestoreData";
import SpinnerLoader from "./SpinnerLoader";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const [user, setUser] = useState<any>({});
  const [userProjects, setUserProjects] = useState<any>({});

  useEffect(() => {
    if (auth.currentUser) {
      getUserFromDB(auth.currentUser?.email).then((user) => setUser(user));
      getProjectsFromUser(auth.currentUser?.email).then((project) => setUserProjects(getStateOfProjects(project)));
    } else {
      history.push("/login");
    }
  }, [history]);


  const getStateOfProjects = (projects:any) => {
    const activeProjects =  projects.filter((item:any) => item.isDone === false);
    const numberActiveProjects = activeProjects.length;
    const doneProjects =  projects.filter((item:any) => item.isDone !== false);
    const numberDoneProjects = doneProjects.length;
    const totalProjects = numberActiveProjects + numberDoneProjects;
    
    return {
      numberActiveProjects, numberDoneProjects, totalProjects
    }
    
  };

  return user.profilePhotoURL? (
    <div className="row justify-content-center align-content-center mt-5">
      <div className="col-10 col-md-6 col-lg-4 userProfileCard__headerContainer">
        <div className="row justify-content-center m-2">
          <img
            src={user.profilePhotoURL}
            alt="Foto de Perfil de usuario"
            className="userProfileCard__image"
            width="100px"
            onClick={() => {console.log('gola');}}
          />
        </div>
        <div className="row justify-content-center">
          <p className="p-0 m-2 userProfileCard__userName">{user.userName}</p>
        </div>
        <div className="row justify-content-center">
          <small className="userProfileCard__userEmail">{user.email}</small>
        </div>
        <hr/>
        <div className="row justify-content-center mt-2 ">
          <div className="col-12 text-center">
            <p className="">Proyectos</p>
          </div>
          <div className="col-4 text-center successFontColor">
            <p>Activos</p>
            <p className="userProfileCard__projectsNumbers">{userProjects.numberActiveProjects}</p>
          </div>
          <div className="col-4 text-center userProfileCard__userEmail">
            <p>Terminados</p>
            <p className="userProfileCard__projectsNumbers">{userProjects.numberDoneProjects}</p>
          </div>
          <div className="col-4 text-center primaryFontColor">
            <p>Totales</p>
            <p className="userProfileCard__projectsNumbers">{userProjects.totalProjects}</p>
          </div> 
        </div>
      </div>
    </div>
  ) : <SpinnerLoader />
};

export default withRouter(UserProfile);
