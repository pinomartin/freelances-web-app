import ExpensesListItem from "./ExpensesListItem";

const ExpensesList = ({expenses}:any) => {

    console.log(expenses);
    return expenses.length !== 0 ? (
        <>
          <h4 className="text-center">{'Gastos Extras'}</h4>
          <div className="container taskList__container">
            <div className="overflow-auto accordion__container__scrollbar">
              <div className="accordion accordion__expenses__height" id="expensesAccordion">
                {expenses.length !== 0
                  ? expenses.map((item: any, index:number) => (
                      <>
                        <ExpensesListItem description={item.description} amount={item.amount} key={item.id} uid={item.uid}/>
                      </>
                    ))
                  : null}
              </div>
            </div>
            </div>
            {/* <div className="row justify-content-center">
              {tasks.length !== 0 && (<p>Tiempo total: {timeToString}</p>)}
              </div>
              <div className="row justify-content-center">
              {tasks.length !== 0 && (<p>Monto a cobrar: ${estimatedTotal}</p>)}
            </div> */}
            </>
      ) : (
        <>
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 text-center">
              <p className="badge badge-info p-3"> Aún no tienes gastos extras! </p>
            </div>
          </div>
        </>
      );
}

export default ExpensesList
