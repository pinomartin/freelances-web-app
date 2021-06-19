import { Expense } from "../interfaces/expense"
import Swal from "sweetalert2";
import { deleteExpense } from "../firebaseUtils/setFirestoreData";


const ExpensesListItem = ({ amount, description, uid }:Expense) => {

  
    return (
        <>
             <>
      <div className="card expenses__listItem bg-dark">
        <div className="card-header expenses__listItem" id="headingOne">
          <p className="p-0 m-0 d-inline primaryFontColor">
            $ {amount}
          </p>

          
          <button
                className="btn btn-danger d-inline float-right ml-1"
                type="button"
                onClick={() =>
                  Swal.fire({
                    title: "Eliminar Gasto?",
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
                      }).then(() => deleteExpense(uid));
                    }
                  })
                }
              >
                <i className="far fa-trash-alt"></i>
              </button>
              <button
            className="btn btn-primary float-right"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${uid}`}
            aria-expanded="true"
            aria-controls={`collapse${uid}`}
          >
            <i className="fas fa-info-circle"></i>
          </button>
        </div>

        <div
          id={`collapse${uid}`}
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#expensesAccordion"
        >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-12">
                <p className="m-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
        </>
    )
}

export default ExpensesListItem
