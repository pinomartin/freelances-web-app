import { useState } from "react";
import {
  addFastBurnHourToDB,
  addNewTaskTimeToDB,
} from "../../firebaseUtils/setFirestoreData";
import useInterval from "../../hooks/useInterval";
import { getTodayDateToString } from "../../hooks/useTime";
import { StopwatchProps } from "../../interfaces/stopwatch";
import { TaskTime } from "../../interfaces/tasktime";
import StopwatchDisplay from "./StopwatchDisplay";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tippy from "@tippyjs/react";

const MySwal = withReactContent(Swal);

const Stopwatch = ({
  projectUID,
  clientUID,
  projectType,
  projectHoursPerDay,
  isAvaibleFastBurn,
}: StopwatchProps) => {
  const initialStateTask: TaskTime = {
    description: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    isActive: true,
    creationDate: 0,
    startTimerDate: 0,
    stopTimerDate: 0,
    isFastHourCharge: false,
    projectUID: "",
    clientUID: "",
  };

  const [stopwatchValues, setStopwatchValues] = useState({
    // currentTimeMs: 0,
    currentTimeSec: 0,
    currentTimeMin: 0,
    currentTimeHour: 0,
  });
  // const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);
  const [currentTimeHour, setCurrentTimeHour] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskTime, setTaskTime] = useState<TaskTime>(initialStateTask);
  const [isVisible, setisVisible] = useState<boolean>(false);

  const [isFastBurnButtonPressed, setIsFastBurnButtonPressed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(!isAvaibleFastBurn);

  // console.log(isAvaibleFastBurn);

  const fastBurningHoursPerDay = (hours: number) => {
    setTaskTime({
      ...taskTime,
      hours: hours,
      minutes: 0,
      seconds: 0,
      creationDate: Date.now(),
      isFastHourCharge: true,
      projectUID: projectUID,
      clientUID: clientUID,
    });
    setisVisible(true);
    setIsFastBurnButtonPressed(true);
  };

  const addNewTaskTime = async () => {
    stop();
    setTaskTime({
      ...taskTime,
      description: "",
      hours: currentTimeHour,
      minutes: currentTimeMin,
      seconds: currentTimeSec,
      isActive: true,
      creationDate: 0,
      stopTimerDate: Date.now(),
      projectUID: projectUID,
      clientUID: clientUID,
    });
    setisVisible(true);
  };

  const handleSubmitTaskDescription = (e: any) => {
    e.preventDefault();
    if (!taskTime.description.trim()) {
      console.log("Debe ingresar descripcion");
      return;
    }
    MySwal.fire({
      position: "center",
      icon: "success",
      title: (
        <>
          <p className="primaryFontColor">Tarea Guardada con exito</p>
          <br />
          <small>{taskTime.description}</small>
          <br />
          <small>{`${taskTime.hours}hs ${taskTime.minutes}min ${taskTime.seconds}sec`}</small>
        </>
      ),
      showConfirmButton: false,
      timer: 2000,
      backdrop: `rgba(50,82,136,0.3)`,
    });
    addNewTaskTimeToDB(taskTime)
      .then(() => setTaskTime(initialStateTask))
      .catch((e) => console.log(e));
    isFastBurnButtonPressed &&
      addFastBurnHourToDB(projectUID, getTodayDateToString()).then(() => {
        setIsFastBurnButtonPressed(false);
        setIsDisabled(true);
      });
    reset();
    setisVisible(false);
  };

  useInterval(() => pace(), isRunning ? 1000 : null);

  const formatTime = (val: any, ...rest: any) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }
    if (rest[0] === "ms" && value.length < 3) {
      value = "0" + value;
    }
    return value;
  };

  const pace = () => {
    setCurrentTimeSec(currentTimeSec + 1);
    // setCurrentTimeMs(currentTimeMs + 10);
    // if (currentTimeMs >= 1000) {
    // setCurrentTimeMs(0);
    // }
    if (currentTimeSec === 59) {
      setCurrentTimeSec(0);
      setCurrentTimeMin(currentTimeMin + 1);
    }
    if (currentTimeMin >= 59) {
      setCurrentTimeHour(currentTimeHour + 1);
      setCurrentTimeMin(0);
    }
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      // setCurrentTimeMs(currentTimeMs);
      setCurrentTimeSec(currentTimeSec);
      setCurrentTimeMin(currentTimeMin);
      setCurrentTimeHour(currentTimeHour);
      setTaskTime({ ...taskTime, startTimerDate: Date.now() });
    }
  };

  const stop = () => {
    setStopwatchValues({ ...stopwatchValues });
    setIsRunning(false);
  };

  const reset = () => {
    // setCurrentTimeMs(0);
    setCurrentTimeSec(0);
    setCurrentTimeMin(0);
    setCurrentTimeHour(0);
    setIsRunning(false);
    setisVisible(false);
  };

  return (
    <div>
      <h4>Contador de Tiempos</h4>
      <StopwatchDisplay
        // currentTimeMs={currentTimeMs}
        currentTimeSec={currentTimeSec}
        currentTimeMin={currentTimeMin}
        currentTimeHour={currentTimeHour}
        formatTime={formatTime}
      />
      <div className="row justify-content-center">
        {isRunning === false && (
          <button className="btn btn-primary w-25" onClick={() => start()}>
            <i className="far fa-play-circle"></i>
          </button>
        )}

        {isRunning === true && (
          <button className="btn btn-danger w-25" onClick={() => stop()}>
            <i className="far fa-pause-circle"></i>
          </button>
        )}

        {currentTimeSec || currentTimeMin || currentTimeHour !== 0 ? (
          <>
            <button
              className="btn btn-warning stopwatch__resetButton"
              onClick={() => reset()}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            <button className="btn btn-info w-25" onClick={addNewTaskTime}>
              <i className="far fa-save"></i>
            </button>
          </>
        ) : null}
      </div>
      <br />
      {projectType === "total" && (
        <>
          <Tippy content="S??lo podr??s utilizarlo 1 vez por d??a" className="">
            <button
              disabled={isDisabled}
              className="btn btn-secondary "
              onClick={() => fastBurningHoursPerDay(projectHoursPerDay)}
            >
              {isDisabled
                ? "Cargaste las horas del dia"
                : `Carga R??pida (${projectHoursPerDay} hs)` }
            </button>
          </Tippy>
        </>
      )}
      {isVisible && (
        <form onSubmit={(e) => handleSubmitTaskDescription(e)}>
          <div className="input-group mt-4">
            <span className="input-group-addon p-1 pr-3 mr-4 primaryFontColor w-25">
              Descripcion
            </span>
            <textarea
              className="form-control form-control-sm mb-2 customForm__input"
              placeholder="Qu?? hiciste en este tiempo?"
              onChange={(e) =>
                setTaskTime({
                  ...taskTime,
                  description: e.target.value,
                  creationDate: Date.now(),
                })
              }
              value={taskTime.description}
            />
          </div>
          <button className="btn btn-dark btn-md btn-block mt-2" type="submit">
            Guardar Tarea!
          </button>
          { isFastBurnButtonPressed && 
            <button
              className="btn btn-warning btn-sm btn-block mt-2"
              type="button"
              onClick={() => {
                setisVisible(!isVisible);
                setIsFastBurnButtonPressed(false);
              }}
            >
              Cancelar
            </button>
          }
        </form>
      )}
    </div>
  );
};

export default Stopwatch;
