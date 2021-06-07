import { useEffect, useState } from "react";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
// import formatDistance from "date-fns/formatDistance";
import { es } from "date-fns/esm/locale";
import {
  getTotalSecondsFromTasks,
  getTotalTimeperProject,
} from "../hooks/useTime";
import { getEstimatedAmount, getEstimatedTotalVSCurrentAmount } from "../hooks/useMoney";

export const ProjectData = ({ projectData, tasks }: any) => {
  const { amountXHour }: any = projectData;

  console.log(projectData);
  console.log(tasks);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [amountGoal, setAmountGoal] = useState(0);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToString(getTotalTimeperProject(totalSeconds));
    setEstimatedTotal(getEstimatedAmount(totalSeconds, amountXHour));
    setAmountGoal(getEstimatedTotalVSCurrentAmount(projectData.estimatedHours, projectData.amountXHour, estimatedTotal))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, totalSeconds, estimatedTotal]);

  const getDaysRemaining = formatDistanceStrict(
    Date.now(),
    projectData.estimatedFinishDate,
    { unit: "day", addSuffix: false, locale: es }
  );
  const getRemaingHours = Math.round(
    projectData.estimatedHours - totalSeconds / 3600
  );

  const getFinishPercentage = 
    Math.round(((totalSeconds / 3600) / projectData.estimatedHours)*100);
  



  return (
    <>
      <h4>Datos Proyecto</h4>
      <div className="container projectData__container">
        <br />
        <div className="row justify-content-end">
          <div className="col-6 text-center">
            <strong className="text-success">{getRemaingHours}</strong>
            <small className="d-block">Horas por quemar</small>
          </div>
          <div className="col-6 text-center">
            <strong>{getDaysRemaining}</strong>
            <small className="d-block">para entrega</small>
          </div>
        </div>
        <br />

        {tasks !== null && totalSeconds > 0 ? (
          <>
            <br />
            <div className="row justify-content-end">
              <div className="col-6 text-center">
                <strong className="text-success">{tasks.length}</strong>
                <small className="d-block">Cantidad de Tiempos cargados</small>
              </div>
              <div className="col-6 text-center">
                <span className="text-danger">$ {amountGoal}</span>
                <small className="d-block">Resto a cobrar</small>
              </div>
            </div>
            <br />
            <br />
            <div className="row justify-content-end">
              <div className="col-6 text-center">
                <small className="d-block">Tiempo total</small>
              <span className="text-warning">{timeToString}</span>
              </div>
              <div className="col-6 text-center">
              <strong className="text-success">$ {estimatedTotal}</strong>
                <small className="d-block">A cobrar</small>
              </div>
            </div>
            <br />
            <br />
            <div className="row justify-content-end">
              <div className="col-6 text-center">
                <strong className="text-success">{getFinishPercentage} % </strong>
                <small className="d-block">Proyecto terminado</small>
              </div>
              <div className="col-6 text-center">
                <span className="text-danger">$ {amountGoal}</span>
                <small className="d-block">Resto a cobrar</small>
              </div>
            </div>
            <br />
            <br />
          </>
        ) : (
          <>
            <small className="text-center d-block">
              Aun has cargado tiempos
            </small>
          </>
        )}
      </div>
    </>
  );
};
