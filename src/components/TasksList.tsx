import { TasksListProps } from "../interfaces/tasklist";
import { TaskListItem } from "./TaskListItem";
import Notimes from "../assets/noTimes2.svg";

export const TasksList = ({ projectData, tasks, title }: TasksListProps) => {
  const { isDone }: any = projectData;

  return tasks.length !== 0 ? (
    <>
      <h4 className="text-center">{title}</h4>
      <div className="container taskList__container">
        <div className="overflow-auto accordion__container__scrollbar">
          <div className="accordion" id="tasksAccordion">
            {tasks.length !== 0
              ? tasks.map((item: any) => (
                  <>
                    <TaskListItem
                      task={item}
                      key={item.id}
                      isProjectDone={isDone}
                    />
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 text-center">
          {!isDone ? (
            <h5>Ups ! Aún no tienes tiempos cargados</h5>
          ) : (
            <h5>Ups ! Has finalizado este proyecto sin cargar tiempos</h5>
          )}
          <img src={Notimes} alt="" className="img-fluid" width="85px" />
          {!isDone ? (
            <p className="mt-2">
              Utiliza el contador de tiempos para registrarlos.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};
