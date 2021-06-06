import { useEffect, useState } from "react";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import formatDistance from "date-fns/formatDistance";
import { es } from "date-fns/esm/locale";
import {
  getTotalSecondsFromTasks,
  getTotalTimeperProject,
} from "../hooks/useTime";
import { getEstimatedAmount } from "../hooks/useMoney";

export const ProjectData = ({ projectData, tasks }: any) => {
  const { amountXHour }: any = projectData;

  console.log(projectData);
  console.log(tasks);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToString(getTotalTimeperProject(totalSeconds));
    setEstimatedTotal(getEstimatedAmount(totalSeconds, amountXHour));
  }, [tasks, totalSeconds]);

  const getDaysRemaining = formatDistanceStrict(
    Date.now(),
    projectData.estimatedFinishDate,
    { unit: "day", addSuffix: false, locale: es }
  );
  const getRemaingHours = Math.round(
    projectData.estimatedHours - totalSeconds / 3600
  );

  return (
    <>
      {/* <h4>Datos Proyecto</h4> */}
      <div className="container bg-dark rounded">
        <br />
        <br />
        <div className="row justify-content-end">
          <div className="col-6 text-center">
            <span className="text-success">{getRemaingHours}</span>
            <small className="d-block">Horas restantes por quemar</small>
          </div>
          <div className="col-6 text-center">
            <span>{getDaysRemaining}</span>
            <small className="d-block">restantes</small>
          </div>
        </div>
        <br />

        {tasks !== null && totalSeconds > 0 ? (
          <>
            <br />
            <div className="row justify-content-end">
              <div className="col-6 text-center">
                <p>Tiempo total: {timeToString}</p>
              </div>
              <div className="col-6 text-center">
                <p> Monto a cobrar: ${estimatedTotal}</p>
              </div>
            </div>
          </>
        ) : null}
        <br />
        <br />
      </div>
    </>
  );
};
