import { TasksListProps } from "../../interfaces/tasklist";
import { TimeListItem } from "./TimeListItem";

const TimesList = ({
  tasks,
  projectData,
  projectUID,
  title,
}: TasksListProps) => {
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
