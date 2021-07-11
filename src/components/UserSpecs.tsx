import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GetDateAndTimePerTask from "../hooks/useGetDateAndTimePerTask";
import GetTasksPerMonth from "../hooks/useGetTasksPerMonth";
import { getTotalDaysOfMonth } from "../hooks/useTime";
import { TaskTime } from "../interfaces/tasktime";
import months from "../data/months.json";
import BarChart from "./Charts/BarChart";
import Select from "react-select";
import { format } from "date-fns";
import { es } from "date-fns/esm/locale";

const UserSpecs = () => {
  const location = useLocation();
  const { tasks }: any = location.state;

  const currentMonthToString = new Date().getMonth().toString();

  const [chartData, setChartData] = useState<any>({});
  const [data, setData] = useState<TaskTime[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [allTasksPerDay, setAllTasksPerDay] = useState([]);
  const [hours, setHours] = useState<any>([]);
  const [month, setMonth] = useState<any>({
    "id": currentMonthToString,
    "label": format(new Date(), "LLLL", {locale: es}).toUpperCase(),
    "value": currentMonthToString
},);

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: "#11ece5",
    }),
    control: (provided: any) => ({
      ...provided,
      color: "#11ece5",
      backgroundColor: "#2b3566",
      border:"none"
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#11ece5",
    }),
    
    input:(provided: any) => ({
        ...provided,
        color: "#11ece5",
      }),
    
  };

  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        neutral0: "#2b3566",
        primary25: "#a47dff",
        primary: "#8c5cfd",
      },
    };
  };

console.log(month.value);

  const getHoursPerDay = (day: number, tasksPerDay: TaskTime[]) => {
    const filteredPerDay = (tasksPerDay as any[]).filter(
      (item) => item.date === day
    );
    if (filteredPerDay[0]) {
      return filteredPerDay[0].hours;
    }
    return 0;
  };

  const getHoursToChart = (days: number[], tasks: TaskTime[]) => {
    const hoursArray: any = [];
    days.forEach((day) => {
      hoursArray.push(getHoursPerDay(day, tasks));
    });
    return hoursArray;
  };

  useEffect(() => {
    setData(GetTasksPerMonth(tasks, Number(month.value)));
    setDays(getTotalDaysOfMonth(Number(month.value)));
  }, [tasks, month.value]);

  useEffect(() => {
    setAllTasksPerDay(GetDateAndTimePerTask(data));
  }, [data]);

  useEffect(() => {
    setHours(getHoursToChart(days, allTasksPerDay));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, allTasksPerDay]);

  // console.log(hoursPerDay(3));

  // console.log("TODAS LAS DEL DIA",allTasksPerDay);
  // console.log('HOURS',hours);
  // console.log('DAYS',days);

  useEffect(() => {
    setChartData({
      labels: days,
      data: hours,
    });
  }, [days, hours]);

  return (
    <div className="container">
        <h3>Mis estadísticas</h3>
      <div className="row justify-content-start no-gutters align-items-center">
        <div className="col-3">
          <Select
            options={months}
            placeholder="Selecciona el Mes"
            theme={customTheme}
            styles={customStyles}
            isSearchable={true}
            onChange={setMonth}
            noOptionsMessage={() => "Mes inválido"}
            defaultValue={month}
          />
        </div>
        <div className="col-6">
          <BarChart
            data={chartData.data}
            labels={chartData.labels}
            subLabel={"Horas"}
            title={`Horas por día por mes`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSpecs;
