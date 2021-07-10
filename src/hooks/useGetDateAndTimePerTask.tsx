import { TaskTime } from "../interfaces/tasktime";
import { getDate } from "date-fns";
import { getTotalSecondsFromSingleTask } from "./useTime";

const useGetDateAndTimePerTask = (tasks: TaskTime[]) => {
  const datesFromTasks = tasks.map((task) => {
    const array = {
      date: getDate(task.creationDate),
      seconds: getTotalSecondsFromSingleTask(task),
      hours: Number((getTotalSecondsFromSingleTask(task) / 3600).toFixed(2)),
    };
    return array;
  });

  const helper: any = {};
  const result = datesFromTasks.reduce(function (r, o) {
    const key: number = o.date;

    if (!helper[key]) {
      helper[key] = Object.assign({}, o); 
      (r as number[]).push(helper[key]);
    } else {
      helper[key].seconds += o.seconds;
    }

    return r;
  }, []);


  return result;
};

export default useGetDateAndTimePerTask;
