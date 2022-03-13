import { TaskTime } from '../interfaces/tasktime';
import { getDate } from 'date-fns'

const useGetTasksPerDay = (tasks:TaskTime[], day:number ) => {
    const tasksPerDay = tasks.filter(tasks => {
        return getDate(tasks.creationDate) === day;
    });
    
    return tasksPerDay; 
};

export default useGetTasksPerDay;

