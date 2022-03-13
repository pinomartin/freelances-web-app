import { Expense } from "../../interfaces/expense"

const ExpensesReportItem = ({amount, description}:Expense) => {
    return (
        <>
      <tr>
        <td className="text-warning">
          {description}
        </td>
        <td className="text-success text-right">
          <strong>$ {amount}</strong>
        </td>
      </tr>
    </>
    )
}

export default ExpensesReportItem
