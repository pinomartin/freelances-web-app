import Swal from "sweetalert2";
import { deleteTask } from "../firebaseUtils/setFirestoreData";

interface TaskListItemProps {
  data: any;
}
export const TaskListItem = ({ data }: TaskListItemProps) => {

  console.log(data);
  const { id, description, creationDate, hours, minutes, seconds } = data;

  return (
    <div className="card bg-dark">
      <div className="card-header" id="headingOne">
        <p className="p-0 m-0 d-inline">
          <span>{hours}hs </span>
          <span>{minutes}min </span>
          <span>{seconds}sec </span>
        </p>

        <button
          className="btn btn-info float-right"
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
          {description}
          <button
            className="btn btn-danger float-right ml-1 "
            type="button"
            onClick={() =>
              Swal.fire({
                title: "Eliminar Tiempo?",
                text: "Este cambio sera permanente...",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#a47dff",
                cancelButtonColor: "#d33",
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
        </div>
      </div>
    </div>
  );
};
