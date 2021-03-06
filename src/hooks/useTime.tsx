import {
  formatDuration,
  format,
  startOfMonth,
  endOfMonth,
  lastDayOfMonth,
  getUnixTime,
  getDate,
  getWeeksInMonth,
  isAfter,
  intervalToDuration,
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

const isPastDate = (estimatedDate: number) => {
  const isPastDate = isAfter(new Date().setHours(0, 0, 0, 0), estimatedDate);
  return isPastDate;
};

const getEndOfMonth = (month?: number) => {
  if (month) {
    return getUnixTime(endOfMonth(new Date().setMonth(month)));
  }

  return getUnixTime(endOfMonth(new Date()));
};

const getTotalDaysOfMonth = (month: number) => {
  var arr = [];

  for (let i = 1; i <= getDate(lastDayOfMonth(month)); i++) {
    arr.push(i);
  }
  return arr;
};

const getTotalWeekssOfMonth = (month: number) => {
  var arr = [];

  for (let i = 1; i <= getWeeksInMonth(month); i++) {
    arr.push(i);
  }
  return arr;
};

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
      days: 0,
      hours: dateHelper.getHours(),
      minutes: dateHelper.getMinutes(),
      seconds: dateHelper.getSeconds(),
    },
    { zero: false, delimiter: " ", locale: es }
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
    { zero: false, delimiter: " ", locale: es }
  );
  return totalTimeperProject;
};

const totalTimeperProjectToString = (seconds: number) => {
  const totalDurationOfProject = intervalToDuration({
    start: 0,
    end: seconds * 1000,
  });
  return totalDurationOfProject;
};

const parseDateToString = (date:number) => {
  const parsedDate = format(date, 'dd/MM/yyyy', {locale: es});
  return parsedDate;
};

const getHourFromDate = (date:number) => {
  const hour = format(date, 'p', {locale: es})
  return hour;
}
// { hours: 2, minutes: 46, seconds: 40 }

export {
  getTotalSecondsFromTasks,
  getTotalTimeperProject,
  getTotalTimeperProjectWithDays,
  getTotalSecondsFromSingleTask,
  getTodayDateToString,
  getStartOfMonth,
  getEndOfMonth,
  getTotalDaysOfMonth,
  getTotalWeekssOfMonth,
  isPastDate,
  totalTimeperProjectToString,
  parseDateToString,
  getHourFromDate
};
