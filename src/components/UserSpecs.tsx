import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getDateAndTimePerTask from "../hooks/useGetDateAndTimePerTask";
import getTasksPerMonth from "../hooks/useGetTasksPerMonth";
import { getTotalDaysOfMonth, getTotalWeekssOfMonth } from "../hooks/useTime";
import { TaskTime } from "../interfaces/tasktime";
import months from "../data/months.json";
import BarChart from "./Charts/BarChart";
import Select from "react-select";
import {
  customStyles,
  customTheme,
} from "../utils/componentThemes/selectTheme";
import { format } from "date-fns";
import { es } from "date-fns/esm/locale";
import getWeekAndTimePerTask from "../hooks/useGetWeekAndTimePerTask";
import LineChart from "./Charts/LineChart";

const UserSpecs = () => {
  const location = useLocation();
  const { tasks }: any = location.state;

  const currentMonthToString = new Date().getMonth().toString();

  const [daysChartData, setDaysChartData] = useState<any>({});
  const [weeksChartData, setWeeksChartData] = useState<any>({});
  const [tasksPerMonth, setTasksPerMonth] = useState<TaskTime[]>([]);
  const [tasksPerWeek, setTasksPerWeek] = useState<TaskTime[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [weeks, setWeeks] = useState<number[]>([]);
  const [allTasksPerDay, setAllTasksPerDay] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState<any>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState<any>([]);
  const [month, setMonth] = useState<any>({
    id: currentMonthToString,
    label: format(new Date(), "LLLL", { locale: es }).toUpperCase(),
    value: currentMonthToString,
  });
 

  const getTotalHoursPerDay = (day: number, tasksPerDay: TaskTime[]) => {
    const filteredPerDay = (tasksPerDay as any[]).filter(
      (item) => item.date === day
    );
    if (filteredPerDay[0]) {
      return filteredPerDay[0].hours;
    }
    return 0;
  };

  const getTotalHoursPerWeek = (week: number, tasksPerDay: TaskTime[]) => {
    const filteredPerDay = (tasksPerDay as any[]).filter(
      (item) => item.week === week
    );
    if (filteredPerDay[0]) {
      return filteredPerDay[0].hours;
    }
    return 0;
  };

  const getHoursToChart = (days: number[], tasks: TaskTime[]) => {
    const hoursArray: any = [];
    days.forEach((day) => {
      hoursArray.push(getTotalHoursPerDay(day, tasks));
    });
    return hoursArray;
  };

  const getWeeksToChart = (weeks: number[], tasks: TaskTime[]) => {
    const weeksArray: any = [];
    weeks.forEach((week) => {
      weeksArray.push(getTotalHoursPerWeek(week, tasks));
    });
    return weeksArray;
  };

  useEffect(() => {
    setTasksPerMonth(getTasksPerMonth(tasks, Number(month.value)));

    setDays(getTotalDaysOfMonth(Number(month.value)));
    setWeeks(getTotalWeekssOfMonth(Number(month.value)));
  }, [tasks, month.value]);


  useEffect(() => {
    setAllTasksPerDay(getDateAndTimePerTask(tasksPerMonth));
    setTasksPerWeek(getWeekAndTimePerTask(tasksPerMonth));
  }, [tasksPerMonth]);

  useEffect(() => {
    setHoursPerDay(getHoursToChart(days, allTasksPerDay));
    setHoursPerWeek(getWeeksToChart(weeks, tasksPerWeek));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, allTasksPerDay, weeks]);


  useEffect(() => {
    setDaysChartData({
      labels: days,
      data: hoursPerDay,
    });
    setWeeksChartData({
      labels: weeks,
      data: hoursPerWeek,
    });
  }, [days, weeks, hoursPerDay, hoursPerWeek]);

  return (
    <div className="container">
      <h3 className="text-center mt-3">Mis estad??sticas</h3>
      <div className="row justify-content-center align-items-center mt-4">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-4 col-md-2">
              <Select
                options={months}
                placeholder="Selecciona el Mes"
                theme={customTheme}
                styles={customStyles()}
                isSearchable={true}
                onChange={setMonth}
                noOptionsMessage={() => "Mes inv??lido"}
                defaultValue={month}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row no-gutters justify-content-center">
            <div className="col-9 pt-2 pb-3">
              <BarChart
                data={daysChartData.data}
                labels={daysChartData.labels}
                subLabel={"Horas"}
                title={`Horas por d??a por mes`}
                xLabel={"Dias"}
                yLabel={"Horas"}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row no-gutters justify-content-center">
            <div className="col-9 pt-2 pb-3">
              <LineChart
                data={weeksChartData.data}
                labels={weeksChartData.labels}
                subLabel={"Horas"}
                title={`Horas por semana por mes`}
                xLabel={"Semanas"}
                yLabel={"Horas"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSpecs;
