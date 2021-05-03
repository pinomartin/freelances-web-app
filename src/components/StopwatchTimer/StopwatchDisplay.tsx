
const StopwatchDisplay = (props:any, refs:any) => {


  return (
    <div className={"stopwatch__display"}>
      <span>
        {props.formatTime(props.currentTimeMin)}:
        {props.formatTime(props.currentTimeSec)}:
        {props.formatTime(props.currentTimeMs, "ms")}
      </span>
    </div>
  );
};

export default StopwatchDisplay;
