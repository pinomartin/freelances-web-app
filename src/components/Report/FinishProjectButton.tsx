import { withRouter } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { finishProjectDB } from '../../firebaseUtils/setFirestoreData';
import Swal from "sweetalert2";


const FinishProjectButton = ({ projectUID, history }: any) => {

    const todayDate = Date.now();
    

  return (
    <Tippy content="Finalizar Proyecto">
      <button
        type='button'
        className="reportButton__finishProject"
        onClick={() =>
            Swal.fire({
              title: "Finalizar Proyecto?",
              text: "Este cambio sera permanente y el proyecto sólo será disponible en modo Consulta. No podrá editarlo.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#a47dff",
              cancelButtonColor: "#E91E63",
              confirmButtonText: "Si, Finalizar",
              cancelButtonText: "Cancelar",
              backdrop: `rgba(50,82,136,0.3)`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Proyecto Finalizado! ",
                  icon: "success",
                  backdrop: `rgba(50,82,136,0.3)`,
                }).then(() => finishProjectDB(projectUID, todayDate).then(()=> history.push("/projects")));
              }
            })
          }
      >
        <i className="fas fa-check"></i>
      </button>
    </Tippy>
  );
};

export default withRouter(FinishProjectButton);
