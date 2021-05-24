import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import {
  getUserFromDB,
  getProjectsFromUser,
} from "../firebaseUtils/getFirestoreData";

import RadialChart from "./RadialChart/RadialChart";
import data from "./RadialChart/data";
import Tippy from "@tippyjs/react";
import SpinnerLoader from "./SpinnerLoader";


const UserProfile = ({ history }: RouteComponentProps<any>) => {
  const [user, setUser] = useState<any>({});
  const [userProjects, setUserProjects] = useState<any>({});
  const [projectsDataChart, setprojectsDataChart] = useState<any>([]);

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

  const getStateOfProjects = (projects: any) => {
    const activeProjects = projects.filter(
      (item: any) => item.isDone === false
    );
    const numberActiveProjects = activeProjects.length;
    const doneProjects = projects.filter((item: any) => item.isDone !== false);
    const numberDoneProjects = doneProjects.length;
    const totalProjects = numberActiveProjects + numberDoneProjects;

    setprojectsDataChart([
      {
        label: "Activos",
        value: numberActiveProjects,
      },
      {
        label: "Terminados",
        value: numberDoneProjects,
      },
    ]);

    return {
      numberActiveProjects,
      numberDoneProjects,
      totalProjects,
    };
  };

  const TooltipContent = ({ color, label, value }: any) => {
    return (
      <div className="svg-radial-chart-tooltip">
        <span
          className="svg-radial-chart-tooltip-symbol"
          style={{ backgroundColor: color }}
        />
        <span className="svg-radial-chart-tooltip-label">{label}</span>
        <span dangerouslySetInnerHTML={{ __html: "&nbsp;&mdash;&nbsp;" }} />
        <span className="svg-radial-chart-tooltip-value">{value}</span>
      </div>
    );
  };

  return user.profilePhotoURL ? (
    <div className="row justify-content-center align-content-center mt-5 p-0 m-0">
      <div className="col-10 col-md-6 col-lg-4 userProfileCard__headerContainer">
        <div className="row justify-content-center m-2">
          <Tippy content="Cambiar foto" placement='right-start'>
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
          <div className="col-4 text-center successFontColor">
            <p>Activos</p>
            <p className="userProfileCard__projectsNumbers">
              {userProjects.numberActiveProjects}
            </p>
          </div>
          <div className="col-4 text-center userProfileCard__userEmail">
            <p>Terminados</p>
            <p className="userProfileCard__projectsNumbers">
              {userProjects.numberDoneProjects}
            </p>
          </div>
          <div className="col-4 text-center primaryFontColor">
            <p>Totales</p>
            <p className="userProfileCard__projectsNumbers">
              {userProjects.totalProjects}
            </p>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center mt-2 ">
          <div className="col-12 text-center">
            <p className="">
              <strong>Tiempos Historicos</strong>
            </p>
          </div>
          <div className="row justify-content-center">
            {/* <div className="col-4 text-center successFontColor">
            <p className="userProfileCard__projectsNumbers">{userProjects.numberActiveProjects}hs</p>
          </div>
          <div className="col-4 text-center userProfileCard__userEmail">
            <p className="userProfileCard__projectsNumbers">{userProjects.numberDoneProjects}min</p>
          </div>
          <div className="col-4 text-center primaryFontColor">
            <p className="userProfileCard__projectsNumbers">{userProjects.totalProjects}seg</p>
          </div>  */}
            <div className="col-6 mb-2">
              <RadialChart
                data={data}
                innerRadius={53}
                outerRadius={106}
                startAngle={0}
                tooltip={true}
                responsive={true}
                tooltipContent={<TooltipContent />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};

export default withRouter(UserProfile);
