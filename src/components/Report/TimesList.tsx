import { TasksListProps } from "../../interfaces/tasklist";
import { TimeListItem } from "./TimeListItem";

const TimesList = ({ tasks, projectData, projectUID, title }: TasksListProps) => {
  return tasks.length !== 0 ? (
    <>
      <h4 className="text-dark text-center">{title}</h4>
      <div className="">
        <table className="table table-striped table-borderless table-dark rounded ">
          <tbody>
            {tasks.length !== 0
              ? tasks.map((item: any) => (
                  <>
                    <TimeListItem
                      task={item}
                      key={item.id}
                      projectData={projectData}
                    />
                  </>
                ))
              : null}
          </tbody>
        </table>

        {/* <div className="overflow-auto accordion__container__scrollbar">
              <div className="accordion" id="tasksAccordion">
                {tasks.length !== 0
                  ? tasks.map((item: any) => (
                      <>
                        <TaskListItem task={item} key={item.id} />
                      </>
                    ))
                  : null}
              </div>
            </div> */}
        {/* <div className="row justify-content-center">
              {tasks.length !== 0 && (<p>Tiempo total: {timeToString}</p>)}
          </div>
          <div className="row justify-content-center">
              {tasks.length !== 0 && (<p>Monto a cobrar: ${estimatedTotal}</p>)}
          </div> */}
      </div>
    </>
  ) : (
    <>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 text-center">
          <p className="badge badge-info p-3">
            Carga tiempos para ver tu progreso !{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default TimesList;
