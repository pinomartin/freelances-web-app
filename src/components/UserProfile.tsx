import { useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import {
  // getUserFromDB,
  getProjectsFromUser,
  getAllTasksFromUser,
  getTasksFromProjectUser,
} from "../firebaseUtils/getFirestoreData";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import SpinnerLoader from "./SpinnerLoader";
import { FreelancesContext } from "../context/FreelancesProvider";
import {
  getTotalSecondsFromTasks,
  // getTotalTimeperProject,
  getTotalTimeperProjectWithDays,
} from "../hooks/useTime";
import DoughtChart from "./Charts/DoughtChart";
import {
  updateUserName,
  updateUserProfilePhoto,
} from "../firebaseUtils/setFirestoreData";

const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const {
    authUser,
    userProjects: projectsFromContext,
    updateContextUser,
    userDB,
  } = useContext(FreelancesContext);
  const [user, setUser] = useState<any>({});
  const [userProjects, setUserProjects] = useState<any>({});
  const [tasks, setTasks] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");
  const [projects, setProjects] = useState<any>({});
  const [chartData, setChartData] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  // const [myChart, setMyChart] = useState(null);
  // const chartRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  console.log(userProjects);

  useEffect(() => {
    if (authUser) {
      // getUserFromDB(authUser.email).then((user) => setUser(user));
      setUser(userDB);
      getProjectsFromUser(authUser.email).then((projects) => {
        setUserProjects(getStateOfProjects(projects));
        setProjects(projects);
      });
      setChartData(getTotalDataperProject(projectsFromContext));
      getAllTasksFromUser(authUser.email).then((tasks) => setTasks(tasks));
    } else {
      history.push("/login");
    }
  }, [history, authUser, projectsFromContext, userDB]); //Cuidado con ese userDB

  // useEffect(() => {
  //   setChartData(getTotalDataperProject(projectsFromContext));
  // }, [projectsFromContext])

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToString(getTotalTimeperProjectWithDays(totalSeconds));
  }, [tasks, totalSeconds, projects]);

 

  const selectPhotoArchive = (newImg: any) => {
    console.log(newImg.target.files[0]);
    const newImgData = newImg.target.files[0];
    if (newImgData === undefined) {
      console.log("Image file not Selected!!");
      return;
    }
    if (
      newImgData.type === "image/png" ||
      newImgData.type === "image/jpg" ||
      newImgData.type === "image/jpeg"
    ) {
      setLoading(true);
      updateUserProfilePhoto(user.email, newImgData).then((imgURL) => {
        setImgError(false);
        updateContextUser({ ...user, profilePhotoURL: imgURL });
        setUser({ ...user, profilePhotoURL: imgURL });
        setLoading(false);
      });
    } else {
      setImgError(true);
      setLoading(false);
    }
  };

  const procesarData = (e: any) => {
    e.preventDefault();
    if (!user.userName.trim()) {
      // setError("Ingrese Nombre de Proyecto");
      return;
    }

    // setError("");
    updateUserName(user.userName, user.email).then((newName) => {
      updateContextUser({ ...user, userName: newName });
      setUser({ ...user, userName: newName });
      setIsEditModeActive(false);
    });
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

  const getTotalDataperProject = (projects: Array<Object>) => {
    // console.log(projects.forEach(element => console.log(element)));
    let projectsNames: string[] = [];
    let timesPerProject: any[] = [];
    if (projects !== null) {
      projects.forEach(async (project: any) => {
        projectsNames.push(project.name);
        const tasks = await getTasksFromProjectUser(project.userId, project.id);
        const totalSeconds = await getTotalSecondsFromTasks(tasks);
        timesPerProject.push(Math.round(totalSeconds / 3600));
      });
    }

    return {
      projectsNames,
      timesPerProject,
    };
  };

  return user.profilePhotoURL ? (
    <div className="row justify-content-center align-content-center mt-5 p-0 m-0">
      <div className="col-10 col-md-6 col-lg-4 userProfileCard__headerContainer">
        <div className="row justify-content-center m-2 p-0 align-items-center">
          <div className="userProfile__imageContainer text-center">
            {imgError ? (
              <p className="alert alert-warning">
                Tipos compatibles .PNG, .JPG, .JPEG
              </p>
            ) : null}
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <img
                  src={user.profilePhotoURL}
                  alt="Foto de Perfil de usuario"
                  className="userProfileCard__image"
                />
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  style={{ display: "none" }}
                  onChange={(e) => selectPhotoArchive(e)}
                  disabled={loading}
                />
                <Tippy
                  content="Cambiar foto"
                  placement="right-start"
                  arrow={true}
                >
                  <label
                    className={
                      loading
                        ? "btn btn-primary mt-2 disabled"
                        : "btn btn-primary mt-2"
                    }
                    htmlFor="inputGroupFile01"
                  >
                    <i className="fas fa-sync-alt"></i>
                    &nbsp;
                    <i className="far fa-file-image"></i>
                  </label>
                </Tippy>
              </>
            )}

            {/* </div> */}
          </div>
        </div>
        <div className="row justify-content-center">
          {isEditModeActive ? (
            <>
              <form onSubmit={(e) => procesarData(e)} className="d-inline p-0">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm mb-2 customForm__input w-50"
                    onChange={(e) =>
                      setUser({ ...user, userName: e.target.value })
                    }
                    value={user.userName}
                  />
                  <button type="submit" className="btn btn-success float-right">
                    <i className="far fa-check-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger  float-right"
                    onClick={() => setIsEditModeActive(false)}
                  >
                    <i className="far fa-window-close"></i>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="p-0 m-2 userProfileCard__userName">
                {user.userName}
              </p>
              <button
                className="btn bg-transparent p-0 m-0 text-white"
                onClick={() => setIsEditModeActive(true)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
            </>
          )}
        </div>
        <div className="row justify-content-center">
          <small className="userProfileCard__userEmail">{user.email}</small>
        </div>
        <hr />
        <div className="row justify-content-center mt-2 ">
          <div className="col-12 text-center">
            <p className="">
              <strong>Horas por Proyecto</strong>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 mb-2 text-center">
            <div className="userProfile-chart">
              {chartData.timesPerProject.length !== 0 &&
              chartData.projectsNames.length !== 0 ? (
                <DoughtChart
                  data={chartData.timesPerProject}
                  labels={chartData.projectsNames}
                />
              ) : (
                <p className="badge badge-danger">Aun no tienes Proyectos</p>
              )}
            </div>
          </div>

          <Link
            to={{
              pathname: "/userSpecs",
              state: {
                tasks: tasks,
                // projectData: projectData,
                // projectUID: projectUID,
                // expenses: expenses,
              },
            }}
          >
              
            {tasks !== null && totalSeconds > 0 ? <button className="btn btn-success float-right">Mis estadísticas</button> : null }
          
            
          </Link>
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
        <div className="row justify-content-center align-items-center">
          <div className="col-6 text-center userProfile__totalTimer">
            {tasks !== null && totalSeconds > 0 ? (
              <span>{timeToString}</span>
            ) : (
              <>
                <p className="badge badge-warning m-0">
                  Aun no has cargado tiempos
                </p>
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
