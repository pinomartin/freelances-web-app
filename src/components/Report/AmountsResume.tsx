import { useEffect, useState } from 'react';
import { getEstimatedAmount, getTotalExpensesAmount } from '../../hooks/useMoney';
import { getTotalSecondsFromTasks } from '../../hooks/useTime';
import { TasksListProps } from '../../interfaces/tasklist'
const AmountsResume = ({projectData, tasks, expenses}:TasksListProps) => {
    const {amountXHour} = projectData;
    const [totalSeconds, setTotalSeconds] = useState<number>(0);
    const [estimatedTotalWithExpenses, setEstimatedTotalWithExpenses] = useState<number>(0);
    const [estimatedSubtotal, setEstimatedSubtotal] = useState<number>(0);

    useEffect(() => {
        getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
        setEstimatedTotalWithExpenses(getEstimatedAmount(totalSeconds, amountXHour) + getTotalExpensesAmount(expenses));
        setEstimatedSubtotal(getEstimatedAmount(totalSeconds, amountXHour));
        // console.log(getTotalExpensesAmount(expenses));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [tasks, totalSeconds, estimatedTotalWithExpenses]);


    return (
        <div className="row no-gutters justify-content-center text-center">
            <div className="col-12 bg-dark">
                <p>Total a Cobrar (gastos incluidos)</p>
                <span>$ {estimatedTotalWithExpenses}</span>
            </div>
            <div className="col-12 bg-dark">
                <p>Total a Cobrar (sin gastos)</p>
                <span>$ {estimatedSubtotal}</span>
            </div>
        </div>
    )
}

export default AmountsResume
