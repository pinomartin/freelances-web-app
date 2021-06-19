import { ExpensesList } from "../../interfaces/expensesList"
import ExpensesReportItem from "./ExpensesReportItem";

const ExpensesReportList = ({expenses}:ExpensesList) => {
    return expenses.length !== 0 ? (
        <>
          <h4 className="text-center primaryFontColor">{'Gastos Extras'}</h4>
          <div className="">
            <table className="table table-striped table-borderless table-dark rounded ">
              <tbody>
                {expenses.length !== 0
                  ? expenses.map((item: any) => (
                      <>
                        <ExpensesReportItem
                        uid={item.uid}
                          amount={item.amount}
                          description={item.description}
                          key={item.id}
                        />
                      </>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        null
      );
}

export default ExpensesReportList
