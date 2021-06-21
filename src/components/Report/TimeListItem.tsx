import { useState, useEffect } from "react";
import { getEstimatedAmount } from "../../hooks/useMoney";
import { getTotalSecondsFromSingleTask } from "../../hooks/useTime";

//Hacer interface de esto !
interface TaskListItemProps {
  task: any;
  projectData: any;
  isShowPriceTimes: boolean;
  isShowTimes: boolean;
}
export const TimeListItem = ({
  task,
  projectData,
  isShowPriceTimes,
  isShowTimes
}: TaskListItemProps) => {
  const { description, hours, minutes, seconds } = task;
  const { amountXHour } = projectData;

  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    setTotalSeconds(getTotalSecondsFromSingleTask(task));
  }, [task]);

  const renderHours = (hours: number) => {
    if (hours > 0) return <span>{hours}hs </span>;
  };

  const renderMinutes = (minutes: number) => {
    if (minutes > 0) return <span>{minutes}min </span>;
  };
  const renderSeconds = (seconds: number) => {
    if (seconds > 0) return <span>{seconds}seg </span>;
  };

  return (
    <>
      <tr>
        {/* <th scope="row">1</th> */}
        {
          isShowTimes? (
        <td className="text-info">
          {renderHours(hours)} {renderMinutes(minutes)} {renderSeconds(seconds)}
        </td>

          ) : null
        }
        <td>{description}</td>
        {isShowPriceTimes ? (
          <td className="text-success">
            <strong>$ {getEstimatedAmount(totalSeconds, amountXHour)}</strong>
          </td>
        ) : null}
      </tr>
    </>
  );
};
