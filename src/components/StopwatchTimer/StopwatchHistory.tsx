import { useCallback, useEffect, useState } from "react";
import { addNewTaskTimeToDB }  from "../../firebaseUtils/setFirestoreData";
import { TaskTime } from "../../interfaces/tasktime";

const StopwatchHistory = (props: any) => {

  const initialStateTask = {description: '',
  hours: 0,
  minutes: 0,
  seconds: 0,
  isActive: true,
  creationDate: 0,
  projectUID: '',
  clientUID: '',}

  const [history, setHistory] = useState({ history: [] });
  const [taskTime, setTaskTime] = useState<TaskTime>(initialStateTask);
  const [isVisible, setisVisible] = useState<boolean>(false);

  const { currentTimeHour, currentTimeMin, currentTimeSec, projectUID, clientUID} = props;
  console.log(currentTimeHour, currentTimeMin, currentTimeSec, projectUID, clientUID);

  useEffect(() => {
    setHistoryState();
  }, []);

  const setHistoryState = () => {
    if (localStorage.times) {
      setHistory({ history: localStorage.times.split("|") });
    } else {
      setHistory({ history: [] });
    }
  };

  const saveToLocalStorage = () => {
    if (localStorage.times) {
      localStorage.times =
        `${Date().toString()} :: ${props.formatTime(
          props.currentTimeHour
        )}:${props.formatTime(
          props.currentTimeMin
        )}:${props.formatTime(props.currentTimeSec)}|` + localStorage.times;
    } else {
      localStorage.times = `${Date().toString()} :: ${props.formatTime(
        props.currentTimeHour
      )}:${props.formatTime(
        props.currentTimeMin
      )}:${props.formatTime(props.currentTimeSec)}|`;
    }
  };

  const addNewTaskTime =  () => {
    setTaskTime({
      description: '',
      hours: currentTimeHour,
      minutes: currentTimeMin,
      seconds: currentTimeSec,
      isActive: true,
      creationDate: Date.now(),
      projectUID: projectUID,
      clientUID: clientUID,
    })
    setisVisible(true);
}; 

const handleSubmitTaskDescription = (e: any) => {
  e.preventDefault();
  if (!taskTime.description.trim()) {
    console.log('Debe ingresar descripcion');
    return;
  }
  addNewTaskTimeToDB(taskTime);
  setisVisible(false);
}
  
  

  const saveTime = () => {
    if (typeof Storage !== "undefined") {
      saveToLocalStorage();
      addNewTaskTime();
    } else {
      console.error("local storage not supported");
    }
    setHistoryState();
  };

  const resetHistory = () => {
    if (localStorage.times) {
      localStorage.removeItem("times");
    }
    setHistoryState();
  };

  return (
    <div className={"stopwatch__history"}>
      <button className="btn btn-info" onClick={saveTime}><i className="far fa-save"></i></button>
      <button onClick={resetHistory}>Resetear Historial</button>
      {isVisible && (<form onSubmit={(e) => handleSubmitTaskDescription(e)}>
        <div className="input-group">
        <span className="input-group-addon p-1 pr-3 primaryFontColor w-25">
          Descripcion
        </span>

        <input
          type="text"
          className="form-control form-control-sm customForm__input mb-2"
          onChange={(e) =>
            setTaskTime({ ...taskTime, description: e.target.value })
          }
          value={taskTime.description}
        />
      </div>
      <button className="btn btn-dark btn-lg btn-block" type="submit">
                Guardar Tarea!
              </button>
      </form>
      )}
      <h3>Historial</h3>
      <ul>
        {history.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StopwatchHistory;
