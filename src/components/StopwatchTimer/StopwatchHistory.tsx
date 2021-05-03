import { useEffect, useState } from "react";

const StopwatchHistory = (props: any) => {
  const [history, setHistory] = useState({ history: [] });

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
          props.currentTimeMin
        )}:${props.formatTime(props.currentTimeSec)}:${props.formatTime(
          props.currentTimeMs,
          "ms"
        )}|` + localStorage.times;
    } else {
      localStorage.times = `${Date().toString()} :: ${props.formatTime(
        props.currentTimeMin
      )}:${props.formatTime(props.currentTimeSec)}:${props.formatTime(
        props.currentTimeMs,
        "ms"
      )}|`;
    }
  };

  const saveTime = () => {
    if (typeof Storage !== "undefined") {
      saveToLocalStorage();
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
      <button onClick={saveTime}>SAVE TIME</button>
      <button onClick={resetHistory}>RESET HISTORY</button>
      <h3>History</h3>
      <ul>
        {history.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StopwatchHistory;
