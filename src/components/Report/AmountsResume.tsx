import { useEffect, useState } from "react";
import {
  getEstimatedAmount,
  getTotalExpensesAmount,
} from "../../hooks/useMoney";
import { getTotalSecondsFromTasks } from "../../hooks/useTime";
import { ReportTimeList } from "../../interfaces/reportTimeList";

const AmountsResume = ({
  projectData,
  tasks,
  expenses,
  isShowRealTotal,
}: ReportTimeList) => {
  const { amountXHour, estimatedTotal } = projectData;
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [estimatedTotalWithExpenses, setEstimatedTotalWithExpenses] =
    useState<number>(0);
  const [estimatedSubtotal, setEstimatedSubtotal] = useState<number>(0);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setEstimatedTotalWithExpenses(
      getEstimatedAmount(totalSeconds, amountXHour) +
        getTotalExpensesAmount(expenses)
    );
    setEstimatedSubtotal(getEstimatedAmount(totalSeconds, amountXHour));
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, totalSeconds, estimatedTotalWithExpenses]);

  return (
    <div className="row no-gutters justify-content-center text-center">
      <div className="col-6 bg-dark pt-2 pb-2">
        <p className="primaryFontColor">Total a Cobrar (sin gastos)</p>
        <h4 className="text-success">$ {isShowRealTotal? estimatedTotal.toFixed(2) : estimatedSubtotal.toFixed(2)}</h4>
      </div>
      <div className="col-6 bg-dark pt-2 pb-2">
        <p className="primaryFontColor">Total a Cobrar (gastos incluidos)</p>
        <h4 className="text-success">$ {isShowRealTotal? (estimatedTotal + getTotalExpensesAmount(expenses)).toFixed(2) : estimatedTotalWithExpenses.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default AmountsResume;
