import { useContext, useEffect, useState } from "react";
import {
  useParams,
  withRouter,
  RouteComponentProps,
  Link,
} from "react-router-dom";
import { getProjectByID } from "../firebaseUtils/getFirestoreData";
import {
  streamTasksFromProject,
  streamExpensesFromProject,
  getLastFastBurnDate,
  // streamProject,
} from "../firebaseUtils/getFirestoreData";
import { deleteProject } from "../firebaseUtils/setFirestoreData";
import Stopwatch from "./StopwatchTimer/Stopwatch";
import SpinnerLoader from "./SpinnerLoader";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import { TasksList } from "./TasksList";
import { EditProjectDataForm } from "./EditProjectDataForm";
import { ProjectData } from "./ProjectData";
import { FreelancesContext } from "../context/FreelancesProvider";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import { getTodayDateToString } from "../hooks/useTime";
import Tippy from "@tippyjs/react";
import totalAvatar from "../assets/total.svg";
import hourAvatar from "../assets/hour.svg";

interface URLParamsProps {
  id: string;
}

const ProjectScreen = ({ history }: RouteComponentProps<any>) => {
  const { id: projectUID } = useParams<URLParamsProps>();
  const { authUser, userDB } = useContext(FreelancesContext);
  const [projectData, setProjectData] = useState<any>({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [editionMode, setEditionMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [lastFastBurnFromDB, setLastFastBurnFromDB] = useState("01/01/1990");

  console.log(projectData);

  useEffect(() => {
    getProjectByID(projectUID).then((project) => {
      setProjectData(project);
    });

    console.log("render ProjectScreen");
  }, [projectUID]);

  useEffect(() => {
    getLastFastBurnDate(projectUID)
      .then((item) => setLastFastBurnFromDB(item.creationDate))
      .catch((e) => console.log(e));
  }, [projectUID]);

  /**REVISAR ESTE PROBLEMA QUE NO TRAE EL USUARIO..... IMPLEMENTAR CONTEXT  */

  const fastBurnHoursUIHandler = (
    todayDate: string,
    lastFastBurnDate: string
  ): boolean => {
    if (todayDate !== lastFastBurnDate) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (authUser) {
      const unsubscribe = streamTasksFromProject(authUser.email, projectUID, {
        next: (querySnapshot: any) => {
          const updatedTasksItems = querySnapshot.docs.map(
            (docSnapshot: any) => ({
              id: docSnapshot.id,
              ...docSnapshot.data(),
            })
          );
          setTasks(updatedTasksItems);
          // setIsLoaderVisible(false);
        },
        error: () => console.log("task-list-item-failed"),
      });

      return unsubscribe;
    } else {
      history.push("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData, projectUID, setTasks]);

  useEffect(() => {
    if (authUser) {
      const unsubscribe = streamExpensesFromProject(
        authUser.email,
        projectUID,
        {
          next: (querySnapshot: any) => {
            const updatedExpensesItems = querySnapshot.docs.map(
              (docSnapshot: any) => ({
                uid: docSnapshot.id,
                ...docSnapshot.data(),
              })
            );
            setExpenses(updatedExpensesItems);
            setIsLoaderVisible(false);
          },
          error: () => console.log("expenses-list-item-failed"),
        }
      );

      return unsubscribe;
    } else {
      history.push("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData, projectUID, setExpenses]);

  return (
    <div>
      <div className="d-flex p-0 justify-content-center mb-3">
        {isLoaderVisible ? (
          <SpinnerLoader />
        ) : (
          <>
            {/* <div className="sidebar-container">
              <div className="menu">
                <button className="d-block btn-block p-3 border-0">
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
            </div> */}
            <div className="w-90">
              <div className="row m-0 justify-content-center">
                <div className="col-12 mt-1">
                  {projectData.isDone === false ? (
                    <>
                      <Tippy
                        content="Eliminar Proyecto"
                        placement="bottom"
                        arrow={true}
                      >
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
                          <i className="far fa-times-circle"></i>
                        </button>
                      </Tippy>
                      <Tippy
                        content="Editar Proyecto"
                        placement="bottom"
                        arrow={true}
                      >
                        <button
                          className="btn btn-warning float-right"
                          onClick={() => setEditionMode(!editionMode)}
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                      </Tippy>
                    </>
                  ) : null}

                  <Link
                    to={{
                      pathname: "/projreport",
                      state: {
                        tasks: tasks,
                        projectData: projectData,
                        projectUID: projectUID,
                        expenses: expenses,
                        user: userDB
                      },
                    }}
                  >
                    <Tippy
                      content={
                        projectData.isDone
                          ? "Ver Informe"
                          : "Informe y Finalizar"
                      }
                      placement="bottom"
                      arrow={true}
                    >
                      <button className="btn btn-success float-right">
                        {projectData.isDone === false ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="far fa-file-alt"></i>
                        )}
                      </button>
                    </Tippy>
                  </Link>
                </div>
                <div className="col-12 mb-3">
                  <h4 className="text-white">
                    <strong>{projectData?.name}</strong>
                    {projectData.type === "hour" ? (
                      <Tippy content="Presupuesto x hora">
                        <img
                          className="img-fluid"
                          src={hourAvatar}
                          alt="Avatar"
                          width="35px"
                        />
                      </Tippy>
                    ) : (
                      <Tippy content="Presupuesto Total">
                        <img
                          className="img-fluid"
                          src={totalAvatar}
                          alt="Avatar total"
                          width="30px"
                        />
                      </Tippy>
                    )}
                  </h4>
                </div>
                {projectData.isDone === false ? (
                  <div className="col-10 col-md-3 text-center mb-4 align-self-center">
                    <>
                      <Stopwatch
                        projectUID={projectUID}
                        clientUID={projectData?.userId}
                        projectType={projectData?.type}
                        projectHoursPerDay={projectData?.estimatedHoursPerDay}
                        isAvaibleFastBurn={fastBurnHoursUIHandler(
                          getTodayDateToString(),
                          lastFastBurnFromDB
                        )}
                      />
                      <br />
                      <br />
                      {showExpenseForm ? (
                        <ExpensesForm
                          projectUID={projectUID}
                          clientUID={projectData?.userId}
                        />
                      ) : null}
                      <button
                        className="btn btn-info btn-sm mt-2"
                        onClick={() => setShowExpenseForm(!showExpenseForm)}
                      >
                        {showExpenseForm ? "Cerrar" : "Cargar gastos Extras"}
                      </button>
                    </>
                  </div>
                ) : null}
                <div className="col-10 col-md-5 mb-4 p-0">
                  <TasksList
                    title={"Tiempos & Tareas"}
                    projectUID={projectUID}
                    projectData={projectData}
                    clientUID={projectData?.userId}
                    tasks={tasks}
                  />
                  <br />
                  <ExpensesList expenses={expenses} projectData={projectData} />
                </div>
                <div className="col-10 col-md-4">
                  {editionMode ? (
                    <>
                      <EditProjectDataForm
                        projectData={projectData}
                        projectUID={projectUID}
                        setProjectData={setProjectData}
                        setEditionMode={setEditionMode}
                      />
                    </>
                  ) : (
                    <ProjectData projectData={projectData} tasks={tasks} />
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
