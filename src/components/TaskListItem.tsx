import { useState } from "react";
import Swal from "sweetalert2";
import { updateTask, deleteTask } from "../firebaseUtils/setFirestoreData";

interface TaskListItemProps {
  task: any;
}
export const TaskListItem = ({ task }: TaskListItemProps) => {
  const { id, description, creationDate, hours, minutes, seconds } = task;

  const [taskEditionMode, setTaskEditionMode] = useState(false);
  const [onEditTaskData, setOnEditTaskData] = useState(task);

  const handleSubmitTaskDescriptionUpdate = (e: any) => {
    e.preventDefault();
    updateTask(onEditTaskData, task.id);
    setTaskEditionMode(false);
  };
  console.log(task);

  return (
    <div className="card bg-dark">
      <div className="card-header" id="headingOne">
        <p className="p-0 m-0 d-inline primaryFontColor">
          <span>{hours}hs </span>
          <span>{minutes}min </span>
          <span>{seconds}sec </span>
        </p>

        <button
          className="btn btn-primary float-right"
          type="button"
          data-toggle="collapse"
          data-target={`#collapse${id}`}
          aria-expanded="true"
          aria-controls={`collapse${id}`}
        >
          <i className="fas fa-info-circle"></i>
        </button>
      </div>

      <div
        id={`collapse${id}`}
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#tasksAccordion"
      >
        <div className="card-body">
          {taskEditionMode ? (
            <form onSubmit={(e) => handleSubmitTaskDescriptionUpdate(e)}>
              <div className="input-group">
                <textarea
                  className="form-control form-control-sm  customForm__input"
                  placeholder="Qué hiciste en este tiempo?"
                  onChange={(e) => setOnEditTaskData({...onEditTaskData, description: e.target.value})}
                  value={onEditTaskData.description}
                />
                <button
                  className="btn btn-success float-right ml-2"
                  type="submit"
                >
                  <i className="far fa-save"></i>
                </button>
                <button
                  className="btn btn-danger float-right ml-2"
                  type="button"
                  onClick={() => setTaskEditionMode(false)}
                >
                  <i className="far fa-window-close"></i>
                </button>
              </div>
            </form>
          ) : (
            <>
            <div className="row align-items-center">
              <div className="col-8">
              <p className="m-0">{description}</p>

              </div>
              <div className="col-4">

              <button
                className="btn btn-danger d-inline float-right ml-1"
                type="button"
                onClick={() =>
                  Swal.fire({
                    title: "Eliminar Tiempo?",
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
                        title: "Tiempo Borrado !",
                        icon: "success",
                        backdrop: `rgba(50,82,136,0.3)`,
                      }).then(() => deleteTask(id));
                    }
                  })
                }
              >
                <i className="far fa-trash-alt"></i>
              </button>
              <button
                className="btn btn-warning d-inline float-right"
                type="button"
                onClick={() => setTaskEditionMode(true)}
              >
                <i className="far fa-edit"></i>
              </button>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
