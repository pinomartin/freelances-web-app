
const StopwatchDisplay = (props:any, refs:any) => {


  return (
    <div className={"stopwatch__display"}>
      <span>
        {props.formatTime(props.currentTimeHour)}hs
        {props.formatTime(props.currentTimeMin)}min
        {props.formatTime(props.currentTimeSec)}sec
        {/* {props.formatTime(props.currentTimeMs, "ms")} */}
      </span>
    </div>
  );
};

export default StopwatchDisplay;
