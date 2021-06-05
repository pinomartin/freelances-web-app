import { useEffect, useState } from "react";
import { useParams, withRouter, RouteComponentProps } from "react-router-dom";
import { getProjectByID } from "../firebaseUtils/getFirestoreData";
import { streamTasksFromProject } from "../firebaseUtils/getFirestoreData";
import { deleteProject } from "../firebaseUtils/setFirestoreData";
import Stopwatch from "./StopwatchTimer/Stopwatch";
import SpinnerLoader from "./SpinnerLoader";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import { TasksList } from "./TasksList";
import { EditProjectDataForm } from "./EditProjectDataForm";
import { ProjectData } from "./ProjectData";



interface ProjectScreenProps extends RouteComponentProps<any> {
  firebaseUserActive: any;
}

interface URLParamsProps {
  id: string;
}

const ProjectScreen = ({ history, firebaseUserActive }: ProjectScreenProps) => {
  const { id: projectUID } = useParams<URLParamsProps>();

  const [projectData, setProjectData] = useState<any>({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [editionMode, setEditionMode] = useState(false);
  const [tasks, setTasks] = useState([]);

  console.log(projectData);

  useEffect(() => {
    getProjectByID(projectUID).then((project) => {
      setProjectData(project);
      setIsLoaderVisible(false);
    });
    console.log("render ProjectScreen");
  }, [projectUID]);

  /**REVISAR ESTE PROBLEMA QUE NO TRAE EL USUARIO..... IMPLEMENTAR CONTEXT  */
  
  useEffect(() => {
    
      const unsubscribe = streamTasksFromProject('martin91pino@gmail.com', projectUID, {
        next: (querySnapshot: any) => {
          const updatedTasksItems = querySnapshot.docs.map(
            (docSnapshot: any) => ({ id: docSnapshot.id, ...docSnapshot.data() })
          );
          setTasks(updatedTasksItems);
        },
        error: () => console.log("task-list-item-failed"),
      });
      
      return unsubscribe;
    

  }, [projectData, projectUID, setTasks]);

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
              <div className="row m-0 justify-content-center">
                <div className="col-12">
                  <h4 className="text-white">
                    <small>Proyecto</small> {projectData?.name}
                  </h4>
                </div>
                <div className="col-12 mb-3">
                  <button
                    className="btn btn-danger float-right"
                    onClick={() =>
                      Swal.fire({
                        title: "Eliminar Proyecto?",
                        text: "Este cambio sera permanente...",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#a47dff",
                        cancelButtonColor: "#E91E63",
                        confirmButtonText: "Si, borrar",
                        cancelButtonText: "Cancelar",
                        backdrop: `rgba(50,82,136,0.3)`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Proyecto Borrado ! ",
                            icon: "success",
                            backdrop: `rgba(50,82,136,0.3)`,
                          }).then(() => {
                            deleteProject(projectUID);
                            history.push("/projects");
                          });
                        }
                      })
                    }
                  >
                    Eliminar Proyecto
                  </button>
                  <button
                    className="btn btn-warning float-right"
                    onClick={() => setEditionMode(!editionMode)}
                  >
                    Editar Proyecto
                  </button>
                  <button className="btn btn-success float-right">
                    Finalizar Proyecto
                  </button>
                </div>

                <div className="col-10 col-md-4 p-0">
                  <TasksList
                    projectUID={projectUID}
                    projectData={projectData}
                    clientUID={projectData?.userId}
                    tasks={tasks}
                  />
                </div>
                <div className="col-10 col-md-4 text-center">
                  <Stopwatch
                    projectUID={projectUID}
                    clientUID={projectData?.userId}
                  />
                </div>
                <div className="col-10 col-md-4">
                  {editionMode ? (
                    <>
                      <EditProjectDataForm
                        projectData={projectData}
                        projectUID={projectUID}
                      />
                    </>
                  ) : (
                    <ProjectData 
                    projectData={projectData}
                    tasks={tasks}/>
                  )}
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
