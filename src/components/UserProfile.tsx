import { useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  getUserFromDB,
  getProjectsFromUser,
  getAllTasksFromUser,
} from "../firebaseUtils/getFirestoreData";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import SpinnerLoader from "./SpinnerLoader";
import { Doughnut } from "react-chartjs-2";
import { FreelancesContext } from "../context/FreelancesProvider";
import {
  getTotalSecondsFromTasks,
  getTotalTimeperProject,
} from "../hooks/useTime";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const { authUser } = useContext(FreelancesContext);
  const [user, setUser] = useState<any>({});
  const [userProjects, setUserProjects] = useState<any>({});
  const [tasks, setTasks] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");

  useEffect(() => {
    if (authUser) {
      getUserFromDB(authUser.email).then((user) => setUser(user));
      getProjectsFromUser(authUser.email).then((project) =>
        setUserProjects(getStateOfProjects(project))
      );
      getAllTasksFromUser(authUser.email).then((tasks) => setTasks(tasks));
    } else {
      history.push("/login");
    }
  }, [history, authUser]);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToString(getTotalTimeperProject(totalSeconds));
  }, [tasks, totalSeconds]);

  const data = {
    labels: ["Activos", "Terminados"],
    datasets: [
      {
        label: "Proyectos",
        // data: [userProjects.numberDoneProjects, userProjects.numberDoneProjects],
        data: [10, 15],
        backgroundColor: ["rgba(17, 236, 229, 1)", "rgba(164, 125, 255, 0.5)"],
        borderColor:["transparent"]
      },
      
    ],
  };

  const options = {
    legend: {
      labels: {
        fontColor: "#ffffff",
        fontSize: 18,
      },
    },
    cutoutPercentage: 70, 
  };

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
  console.log(tasks);

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
          <Tippy content="Cambiar foto" placement="right-start" arrow={true}>
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
              {userProjects.totalProjects !== 0 &&
              userProjects.totalProjects !== undefined ? (
                <Doughnut type="" data={data} options={options} />
              ) : (
                <p className="badge badge-danger">Aun no tienes Proyectos</p>
              )}
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
        <div className="row justify-content-center">
          <div className="col-6 text-center userProfile__totalTimer">
            {tasks !== null && totalSeconds > 0 ? (
              <span>{timeToString}</span>
            ) : (
              <>
                <p className="badge badge-danger">Aun no has cargado tiempos</p>
              </>
            )}
          </div>
        </div>
        <hr />
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default withRouter(UserProfile);
