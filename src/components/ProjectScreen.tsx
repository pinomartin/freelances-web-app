import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { getProjectByID } from "../firebaseUtils/getFirestoreData";
import Stopwatch from "./StopwatchTimer/Stopwatch";
import SpinnerLoader from "./SpinnerLoader";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import { TasksList } from "./TasksList";
// interface ProjectDetailProps {

// }

interface URLParamsProps {
  id: string;
}

const ProjectScreen = () => {
  let { id: projectUID } = useParams<URLParamsProps>();

  const [projectData, setProjectData] = useState<any>({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  console.log(projectData);

  useEffect(() => {
    getProjectByID(projectUID).then((project) => {
      setProjectData(project);
      setIsLoaderVisible(false);
    });
  }, [projectUID]);

  return (
    <div>
      {/*  {/*REVISAR ESTO !!!!*/}

      <div className="d-flex p-0 justify-content-center">
        {isLoaderVisible ? (
          <SpinnerLoader />
        ) : (
          <>
            <div className="sidebar-container">
              <div className="menu">
                <button className="d-block btn-block  p-3 border-0">
                  <i className="far fa-paper-plane mr-3"></i>
                  Proyecto
                </button>
                <button className="d-block btn-block p-3 border-0">
                  <i className="far fa-clock mr-3"></i>
                  Tiempos
                </button>
                <button className="d-block btn-block p-3 border-0">
                  <i className="far fa-chart-bar mr-3"></i>
                  Reportes
                </button>
              </div>
            </div>
            <div className="w-100">
              <div className="row m-0">
                <div className="col-12">
                  <h4 className="text-white">
                    <small>Proyecto</small> {projectData?.name}
                  </h4>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-danger float-right"
                    onClick={() =>
                      Swal.fire({
                        title: "Gola",
                        backdrop: `
                                rgba(164,125,255,0.3)`,
                      })
                    }
                  >
                    Eliminar Proyecto
                  </button>
                  <button className="btn btn-warning float-right">
                    Editar Proyecto
                  </button>
                  <button className="btn btn-success float-right">
                    Finalizar Proyecto
                  </button>
                </div>

                <div className="col-6 col-md-3 p-0">
                  <TasksList projectUID={projectUID}
                    clientUID={projectData?.userId}/>
                </div>
                <div className="col-12 col-md-3 text-center">
                  <Stopwatch
                    projectUID={projectUID}
                    clientUID={projectData?.userId}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <h4>edicion datos</h4>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(ProjectScreen);
