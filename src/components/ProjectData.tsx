import { useEffect, useState } from "react";
import { differenceInBusinessDays, formatDistanceStrict } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { es } from "date-fns/esm/locale";
import {
  getTotalSecondsFromTasks,
  isPastDate,
  totalTimeperProjectToString,
  getTotalTimeperProject,
} from "../hooks/useTime";
import {
  getEstimatedAmount,
  getEstimatedTotalVSCurrentAmount,
} from "../hooks/useMoney";
import getFormattedTasks from "../hooks/getFormattedTasks";
import getHigherTask from "../hooks/getHigherTask";

export const ProjectData = ({ projectData, tasks }: any) => {
  const SECONDS_IN_A_DAY = 86400;

  const {
    amountXHour,
    isDone: isProjectDone,
    estimatedFinishDate,
    estimatedHours,
  }: any = projectData;

  console.log("Datos de Proyecto", projectData);
  console.log(tasks);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");
  const [timeToStringWhitDays, setTimeToStringWhitDays] = useState<Duration>(
    {}
  );
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [amountGoal, setAmountGoal] = useState(0);
  const [higherTask, setHigherTask] = useState<any>([{}]);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToStringWhitDays(totalTimeperProjectToString(totalSeconds));
    setTimeToString(getTotalTimeperProject(totalSeconds));
    setEstimatedTotal(getEstimatedAmount(totalSeconds, amountXHour));
    setAmountGoal(
      getEstimatedTotalVSCurrentAmount(
        projectData.estimatedHours,
        projectData.amountXHour,
        estimatedTotal
      )
    );
    setHigherTask(getHigherTask(getFormattedTasks(tasks)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, totalSeconds, estimatedTotal]);

  console.log(higherTask[0]);

  const getDaysRemaining = (estimatedFinishDate: number) => {
    if (isPastDate(estimatedFinishDate)) {
      const daysRemaining = formatDistanceStrict(
        estimatedFinishDate,
        Date.now(),
        { unit: "day", addSuffix: false, locale: es, roundingMethod: "floor" }
      );
      const message = (
        <>
          <strong className="text-danger">{daysRemaining}</strong>
          <small className="d-block text-danger">de demora en entrega</small>
        </>
      );
      return message;
    }

    const daysRemaining = formatDistanceStrict(
      Date.now(),
      estimatedFinishDate,
      { unit: "day", addSuffix: false, locale: es }
    );
    const message = (
      <>
        <strong>{daysRemaining}</strong>
        <small className="d-block">para entrega</small>
      </>
    );
    return message;
  };

  const getRemaingHours = Math.round(
    projectData.estimatedHours - totalSeconds / 3600
  );

  const getFinishPercentage = (isProjectDone: boolean): number => {
    if (isProjectDone) {
      return 100;
    }
    const percentage = Math.round(
      (totalSeconds / 3600 / projectData.estimatedHours) * 100
    );
    return percentage;
  };

  // const isPastDate = (estimatedDate:number) => {
  //   const isPastDate = isAfter(new Date().setHours(0, 0, 0 ,0), estimatedDate);
  //   return isPastDate;
  // }

  console.log("Es fecha pasada ? ", isPastDate(estimatedFinishDate));

  const getLaboralDaysFromTotalProject = (estimatedFinishDate: number) => {
    if (isPastDate(estimatedFinishDate)) {
      const daysPastDue = differenceInBusinessDays(
        Date.now(),
        estimatedFinishDate
      );
      const message = (
        <>
          <strong className="text-danger">{daysPastDue} dias</strong>
          <small className="d-block text-danger"> de demora en entrega</small>
        </>
      );
      return message;
    }
    const daysRemaining = differenceInBusinessDays(
      estimatedFinishDate,
      Date.now()
    );
    const message = (
      <>
        <strong>{daysRemaining} dias</strong>
        <small className="d-block">para entrega</small>
      </>
    );
    return message;
  };

  return (
    <>
      <h4 className="text-center">Tu progreso</h4>
      <div className="container projectData__container">
        <div className="row justify-content-end p-3">
          <div className="col-6 text-center">
            <strong className="primaryFontColor">
              {getRemaingHours} <small className="text-white">/</small>{" "}
              {estimatedHours}{" "}
            </strong>

            <small className="d-block">Horas a completar</small>
          </div>
          <div className="col-6 text-center">
            {projectData.type === "hour" ? (
              getDaysRemaining(estimatedFinishDate)
            ) : (
              <strong>
                {getLaboralDaysFromTotalProject(
                  projectData.estimatedFinishDate
                )}{" "}
              </strong>
            )}
          </div>
        </div>

        {tasks !== null && totalSeconds > 0 ? (
          <>
            <div className="row justify-content-end align-items-center p-3">
              <div className="col-6 text-center">
                <strong className="text-success">{tasks.length}</strong>
                <small className="d-block">Cantidad de Tiempos cargados</small>
              </div>
              <div className="col-6 text-center">
                <span className="text-danger">$ {amountGoal}</span>
                <small className="d-block">Resto a cobrar</small>
              </div>
            </div>

            <div className="row justify-content-end align-items-center p-3">
              <div className="col-6 text-center">
                <span className="text-warning">
                  {totalSeconds > SECONDS_IN_A_DAY
                    ? `${timeToStringWhitDays.days} días ${timeToStringWhitDays.hours} horas ${timeToStringWhitDays.minutes} minutos ${timeToStringWhitDays.seconds} segundos `
                    : timeToString}
                </span>
                <small className="d-block">Tiempo total</small>
              </div>
              <div className="col-6 text-center">
                <strong className="text-success">$ {estimatedTotal}</strong>
                <small className="d-block">Disponible a cobrar</small>
              </div>
            </div>

            <div className="row justify-content-end align-items-center p-3">
              <div className="col-6 text-center">
                {/* <strong className="text-success">{getFinishPercentage} % </strong> */}
                <CircularProgressbar
                  className="img-fluid w-50"
                  value={getFinishPercentage(isProjectDone)}
                  text={`${getFinishPercentage(isProjectDone)}%`}
                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: "butt",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(164, 125, 255)`,
                    textColor: "#11ece5",
                    trailColor: "#50306e",
                    backgroundColor: "#fff",
                  })}
                />
                <small className="d-block">Proyecto terminado</small>
              </div>

              <div className="col-6 text-center">
                {higherTask[0] ? (
                  <>
                    <small className="d-block">Tarea mas larga</small>
                    <span className="primaryFontColor">
                      {higherTask[0].duration}
                    </span>
                    <small className="d-block">
                      {higherTask[0].description}
                    </small>
                    <span className="badge rounded-pill bg-dark secondaryFontColor">
                      {higherTask[0].date +'   '+ higherTask[0].hour}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row justify-content-end align-items-center p-3">
              <div className="col-12 text-center">
                <p className="badge badge-danger">
                  Aun no tienes Tiempos cargados
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
