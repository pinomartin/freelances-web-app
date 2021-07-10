import { TaskTime } from '../interfaces/tasktime';
import { getMonth } from 'date-fns'

const useGetTasksPerMonth = (tasks:TaskTime[], month:number ) => {
    const taskPerMonth = tasks.filter(tasks => {
        return getMonth(tasks.creationDate) === month;
    })
    return taskPerMonth; 
};

export default useGetTasksPerMonth;

