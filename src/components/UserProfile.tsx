import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import {
  getUserFromDB,
  getProjectsFromUser,
} from "../firebaseUtils/getFirestoreData";

import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import SpinnerLoader from "./SpinnerLoader";
import { Doughnut } from "react-chartjs-2";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const [user, setUser] = useState<any>({});
  const [userProjects, setUserProjects] = useState<any>({});

  useEffect(() => {
    if (auth.currentUser) {
      getUserFromDB(auth.currentUser?.email).then((user) => setUser(user));
      getProjectsFromUser(auth.currentUser?.email).then((project) =>
        setUserProjects(getStateOfProjects(project))
      );
    } else {
      history.push("/login");
    }
  }, [history]);

  const data = {
    labels: ['Activos', 'Terminados'],
    datasets: [
      {
        label: 'Proyectos',
        data: [userProjects.numberActiveProjects, userProjects.numberDoneProjects],
        backgroundColor: [
          'rgba(17, 236, 229, 1)',
          'rgba(164, 125, 255, 0.5)',],
      }
    ]
  };

  const options = { 
    legend: {
        labels: {
            fontColor: "#ffffff",
            fontSize: 18
        }
    }};


  const getStateOfProjects = (projects: any) => {
    const activeProjects = projects.filter(
      (item: any) => item.isDone === false
    );
    const numberActiveProjects = activeProjects.length;
    const doneProjects = projects.filter((item: any) => item.isDone !== false);
    const numberDoneProjects = doneProjects.length;
    const totalProjects = numberActiveProjects + numberDoneProjects;


    return {
      numberActiveProjects,
      numberDoneProjects,
      totalProjects,
    };
  };

  // const TooltipContent = ({ color, label, value }: any) => {
  //   return (
  //     <div className="svg-radial-chart-tooltip">
  //       <span
  //         className="svg-radial-chart-tooltip-symbol"
  //         style={{ backgroundColor: color }}
  //       />
  //       <span className="svg-radial-chart-tooltip-label">{label}</span>
  //       <span dangerouslySetInnerHTML={{ __html: "&nbsp;&mdash;&nbsp;" }} />
  //       <span className="svg-radial-chart-tooltip-value">{value}</span>
  //     </div>
  //   );
  // };

  return user.profilePhotoURL ? (
    <div className="row justify-content-center align-content-center mt-5 p-0 m-0">
      <div className="col-10 col-md-6 col-lg-4 userProfileCard__headerContainer">
        <div className="row justify-content-center m-2">
          <Tippy content="Cambiar foto" placement='right-start' arrow={true}>
            <img
              src={user.profilePhotoURL}
              alt="Foto de Perfil de usuario"
              className="userProfileCard__image"
              width="100px"
              onClick={() => {
                console.log("gola");
              }}
            />
          </Tippy>
        </div>
        <div className="row justify-content-center">
          <p className="p-0 m-2 userProfileCard__userName">{user.userName}</p>
        </div>
        <div className="row justify-content-center">
          <small className="userProfileCard__userEmail">{user.email}</small>
        </div>
        <hr />
        <div className="row justify-content-center mt-2 ">
          <div className="col-12 text-center">
            <p className="">
              <strong>Proyectos</strong>
            </p>
          </div>
          </div>
          <div className="row justify-content-center">
          <div className="col-12 mb-2 text-center">
              <div className="userProfile-chart">
                    <Doughnut type='' data={data} options={options} />
              </div>
            </div>
        </div>
        <hr />
        <div className="row justify-content-center mt-2 ">
          <div className="col-12 text-center">
            <p className="">
              <strong>Tiempos Historicos</strong>
            </p>
          </div>
          {/* <div className="row justify-content-center"> */}
            {/* <div className="col-4 text-center successFontColor">
            <p className="userProfileCard__projectsNumbers">{userProjects.numberActiveProjects}hs</p>
          </div>
          <div className="col-4 text-center userProfileCard__userEmail">
            <p className="userProfileCard__projectsNumbers">{userProjects.numberDoneProjects}min</p>
          </div>
          <div className="col-4 text-center primaryFontColor">
            <p className="userProfileCard__projectsNumbers">{userProjects.totalProjects}seg</p>
          </div>  */}
           
          </div>
        </div>
      </div>
  ) : (
    <SpinnerLoader />
  );
};

export default withRouter(UserProfile);
