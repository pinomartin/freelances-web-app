import { useState } from "react";
import { addExpenseToDB } from '../firebaseUtils/setFirestoreData';

const ExpensesForm = ({ projectUID, clientUID }:any) => {
  
    const initialFormData = {
    description: "",
    amount: 0,
    projectUID: projectUID,
    clientUID: clientUID
  };

  const procesarData = (e: any) => {
    e.preventDefault();
    if (!expenseData.description.trim()) {
      setError("Ingrese la descripcion");
      return;
    }
    addExpenseToDB(expenseData).then(() => setExpenseData(initialFormData)).catch(e => setError(e));
    setError('');
  };

  const [expenseData, setExpenseData] = useState(initialFormData);
  const [error, setError] = useState("");

  return (
    <div className="row no-gutters justify-content-center">
      <div className="col-8">
        <h4>Gastos</h4>
        <form onSubmit={(e) => procesarData(e)}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="input-group mt-1 mt-md-3">
            
            <input
              placeholder="Descripcion de Gasto"
              type="text"
              className="form-control form-control-sm mb-2 customForm__input"
              onChange={(e) =>
                setExpenseData({ ...expenseData, description: e.target.value })
              }
              value={expenseData.description}
            />
          </div>
          <div className="input-group">
            <span className="input-group-addon p-1 primaryFontColor w-50">
              $
            </span>
            <input
              type="number"
              className="form-control form-control-sm mb-2 customForm__input currency"
              min="0.01"
              step="0.01"
              data-number-to-fixed="2"
              data-number-stepfactor="100"
              onChange={(e: any) =>
                setExpenseData({
                  ...expenseData,
                  amount: Number(e.target.value),
                })
              }
              value={expenseData.amount}
            />
          </div>
          <button className="btn btn-secondary btn-block" type="submit">
              Guardar Gasto!
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpensesForm;
