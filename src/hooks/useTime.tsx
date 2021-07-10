import {
  formatDuration,
  format,
  startOfMonth,
  endOfMonth,
  lastDayOfMonth,
  getUnixTime,
  getDate
} from "date-fns";
import { es } from "date-fns/esm/locale";

const getTodayDateToString = () => {
  const date = new Date();
  const todayDate = format(date, "dd/MM/yyyy");
  return todayDate;
};

const getStartOfMonth = (month?: number) => {
  if (month) {
    return getUnixTime(startOfMonth(new Date().setMonth(month)));
  }

  return getUnixTime(endOfMonth(new Date()));
};

const getEndOfMonth = (month?: number) => {
  if (month) {
    return getUnixTime(endOfMonth(new Date().setMonth(month)));
  }
  
  return getUnixTime(endOfMonth(new Date()));
};

const getTotalDaysOfMonth = (month:number) => {
  var arr = []

for (let i = 1; i <= getDate(lastDayOfMonth(month)); i++) {
    arr.push(i);
}
return arr;
}



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

const getTotalSecondsFromSingleTask = (task: any): number => {
  const initialDate = new Date(2021, 5, 29, 0, 0, 0, 0);
  const finalDate = new Date(
    2021,
    5,
    29,
    task.hours,
    task.minutes,
    task.seconds,
    0
  );
  const seconds = (finalDate.getTime() - initialDate.getTime()) / 1000;
  return seconds;
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

const getTotalTimeperProjectWithDays = (totalSeconds: number) => {
  const dateHelper = new Date(new Date().setHours(0, 0, 0, 0));
  dateHelper.setDate(-1);
  dateHelper.setHours(0, 0, 0, 0);
  dateHelper.setSeconds(totalSeconds);
  const totalTimeperProject = formatDuration(
    {
      days: dateHelper.getDay(),
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
  getTotalTimeperProject,
  getTotalTimeperProjectWithDays,
  getTotalSecondsFromSingleTask,
  getTodayDateToString,
  getStartOfMonth,
  getEndOfMonth,
  getTotalDaysOfMonth,
};
