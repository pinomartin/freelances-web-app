import { formatDuration } from "date-fns";
import { es } from "date-fns/esm/locale";

const getTotalSecondsFromTasks = async (tasks: any) => {
    const totalSeconds = await tasks.reduce(function (
      accumulator: number,
      tasks: any
    ) {
      const initialDate = new Date(2021, 5, 29, 0, 0, 0, 0);
      const finalDate = new Date(
        2021,
        5,
        29,
        tasks.hours,
        tasks.minutes,
        tasks.seconds,
        0
      );
      const seconds = (finalDate.getTime() - initialDate.getTime()) / 1000;

      return accumulator + seconds;
    },
    0);

    return totalSeconds;
  };

  
  const getTotalTimeperProject = (totalSeconds: number) => {
    const dateHelper = new Date(new Date().setHours(0, 0, 0, 0));
    dateHelper.setHours(0, 0, 0, 0);
    dateHelper.setSeconds(totalSeconds);
    const totalTimeperProject = formatDuration(
      {
        hours: dateHelper.getHours(),
        minutes: dateHelper.getMinutes(),
        seconds: dateHelper.getSeconds(),
      },
      { zero: true, delimiter: " ", locale: es }
    );
    return totalTimeperProject;
  };



  export {
      getTotalSecondsFromTasks,
      getTotalTimeperProject
  }