import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import GetDateAndTimePerTask from "../hooks/useGetDateAndTimePerTask";
// import useGetTasksPerDay from "../hooks/useGetTasksPerDay";
import GetTasksPerMonth from "../hooks/useGetTasksPerMonth";
import { getTotalDaysOfMonth } from "../hooks/useTime";
import { TaskTime } from "../interfaces/tasktime";
import LineChart from "./Charts/LineChart";



const UserSpecs = () => {
    const location = useLocation();
    const { tasks }: any = location.state;
    
    const [chartData, setChartData] = useState<any>({});
    const [data, setData] = useState<TaskTime[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [allTasksPerDay, setAllTasksPerDay] = useState([]);
    const [hours, setHours] = useState<any>([]);

    const getHoursPerDay = (day:number, tasksPerDay:TaskTime[]) => {
        const filteredPerDay = (tasksPerDay as any[]).filter(item => item.date === day)
        if(filteredPerDay[0]){
            return filteredPerDay[0].hours;
        }
        return 0;
    };

    const getHoursToChart = (days:number[], tasks:TaskTime[]) => {
        const hoursArray:any = [];
        days.forEach((day) => {
            hoursArray.push(getHoursPerDay(day, tasks));
    
        })
        return hoursArray;
        
    }
    
    
    useEffect(() => {
        setData(GetTasksPerMonth(tasks, 5));
        setDays(getTotalDaysOfMonth(5));
    }, [tasks])
    
    useEffect(() => {
        setAllTasksPerDay(GetDateAndTimePerTask(data));
    }, [data])

    useEffect(() => {
        setHours(getHoursToChart(days, allTasksPerDay));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days, allTasksPerDay])
   


    

    // console.log(hoursPerDay(3));

    // console.log("TODAS LAS DEL DIA",allTasksPerDay);
    // console.log('HOURS',hours);
    // console.log('DAYS',days);

    useEffect(() => {
        setChartData({
            labels:days,
            data: hours
        })
    }, [days, hours])
    


    return (
        <div className="row justify-content-center no-gutters">
            <div className="col-4">
                <LineChart data={chartData.data}
                  labels={chartData.labels}/>
            </div>
        </div>
    )
}

export default UserSpecs;
