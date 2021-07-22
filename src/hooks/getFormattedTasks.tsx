import { TaskTime } from "../interfaces/tasktime"
import { getHourFromDate, getTotalSecondsFromSingleTask, getTotalTimeperProject, parseDateToString } from "./useTime"

const getFormattedTasks = (tasks:TaskTime[]) => {
   const formattedTasks = tasks.map(task => {
       const array = {
           totalSeconds: getTotalSecondsFromSingleTask(task),
           date: parseDateToString(task.creationDate),
           description: task.description,
           hour: getHourFromDate(task.creationDate),
           duration: getTotalTimeperProject(getTotalSecondsFromSingleTask(task))
       }
       return array;
   });

   return formattedTasks;
}

export default getFormattedTasks;
