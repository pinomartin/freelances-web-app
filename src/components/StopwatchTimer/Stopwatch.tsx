import { useState } from "react";
import StopwatchDisplay from "./StopwatchDisplay";
import StopwatchHistory from "./StopwatchHistory";
import useInterval from "../../hooks/useInterval";

const Stopwatch = () => {

  const [stopwatchValues, setStopwatchValues] = useState({
    // currentTimeMs: 0,
    currentTimeSec: 0,
    currentTimeMin: 0,
    currentTimeHour:0,
  });

  // const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [currentTimeMin, setCurrentTimeMin] = useState(0);
  const [currentTimeHour, setCurrentTimeHour] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useInterval(()=> pace(), isRunning ? 1000 : null);


  const formatTime = ((val:any, ...rest:any) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }
    if (rest[0] === "ms" && value.length < 3) {
      value = "0" + value;
    }
    return value;
  });

  
  const pace = () => {
    setCurrentTimeSec(currentTimeSec + 1);
    // setCurrentTimeMs(currentTimeMs + 10);
    // if (currentTimeMs >= 1000) {
        // setCurrentTimeMs(0);
    // }
    if (currentTimeSec >= 59) {
        setCurrentTimeMin(currentTimeMin + 1);
        setCurrentTimeSec(0);
    }
    if (currentTimeMin >= 60){
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
  };

  return (
    <div className={"stopwatch"}>
      <h2>Contador Tiempos</h2>
      {isRunning === false && (
        <button onClick={() => start()}><i className="far fa-play-circle"></i></button>
      )}
      {isRunning === true && (
        <button onClick={() => stop()}><i className="far fa-pause-circle"></i></button>
      )}
      <button onClick={() => reset()}><i className="fas fa-sync-alt"></i></button>
      <StopwatchDisplay
        // currentTimeMs={currentTimeMs}
        currentTimeSec={currentTimeSec}
        currentTimeMin={currentTimeMin}
        currentTimeHour={currentTimeHour}
        formatTime={formatTime}
      />
      <StopwatchHistory  
        // currentTimeMs={currentTimeMs}
        currentTimeSec={currentTimeSec}
        currentTimeMin={currentTimeMin}
        currentTimeHour={currentTimeHour}
        formatTime={formatTime} />
    </div>
  );


};


export default Stopwatch;
