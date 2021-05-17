import { useEffect, useState } from "react";
// import addNewTaskTimeToDB  from "../../firebaseUtils/setFirestoreData";
import { TaskTime } from "../../interfaces/tasktime";


const StopwatchHistory = (props: any) => {
  const [history, setHistory] = useState({ history: [] });
  const [taskTime, setTaskTime] = useState<TaskTime>({
    description: '',
    hours: 0,
    minutes: 0,
    seconds: 0,
    isActive: true,
    creationDate: 0,
    projectUID: '',
    clientUID: '',
  });

  console.log(taskTime);
  // const { formatTime, currentTimeHour, currentTimeMin, currentTimeSec} = props;

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
      hours: 0,
      minutes: 0,
      seconds: 0,
      isActive: true,
      creationDate: 0,
      projectUID: '',
      clientUID: '',
    })

  }
  

  const saveTime = () => {
    if (typeof Storage !== "undefined") {
      saveToLocalStorage();
      addNewTaskTime()
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
