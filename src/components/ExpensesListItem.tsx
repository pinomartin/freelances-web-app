import { Expense } from "../interfaces/expense"

const ExpensesListItem = ({ amount, description, uid }:Expense) => {
    return (
        <>
             <>
      <div className="card expenses__listItem">
        <div className="card-header expenses__listItem" id="headingOne">
          <p className="p-0 m-0 d-inline primaryFontColor">
            {description}
          </p>

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
                <p className="m-0 errorFontColor">{amount}</p>
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
