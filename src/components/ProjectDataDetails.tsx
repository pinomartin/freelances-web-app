import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getDateAndTimePerTask from "../hooks/useGetDateAndTimePerTask";
import getTasksPerMonth from "../hooks/useGetTasksPerMonth";
import { getTotalDaysOfMonth, getTotalWeekssOfMonth } from "../hooks/useTime";
import { TaskTime } from "../interfaces/tasktime";
import months from "../data/months.json";
import Select from "react-select";
import {
  customStyles,
  customTheme,
} from "../utils/componentThemes/selectTheme";
import { format } from "date-fns";
import { es } from "date-fns/esm/locale";
import getWeekAndTimePerTask from "../hooks/useGetWeekAndTimePerTask";
import BarChart from "./Charts/BarChart";
import CustomDoughtChart from "./Charts/CustomDoughtChart";

const ProjectDataDetails = () => {
  const location = useLocation();
  const { tasks, project }: any = location.state;

  console.log(project);
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

  // console.log("semanas", hoursPerWeek);

  useEffect(() => {
    setAllTasksPerDay(getDateAndTimePerTask(tasksPerMonth));
    setTasksPerWeek(getWeekAndTimePerTask(tasksPerMonth));
  }, [tasksPerMonth]);

  useEffect(() => {
    setHoursPerDay(getHoursToChart(days, allTasksPerDay));
    setHoursPerWeek(getWeeksToChart(weeks, tasksPerWeek));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, allTasksPerDay, weeks]);

  // console.log(hours);
  // console.log(allTasksPerDay);
  // console.log(hoursPerDay(3));

  // console.log("TODAS LAS DEL DIA",allTasksPerDay);
  // console.log('HOURS',hours);
  // console.log('DAYS',days);

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
      <h3 className="text-center mt-4">{project.name}</h3>
      <div className="row justify-content-center">
        <div className="col-10 col-md-4 text-center">
          <p className="secondaryFontColor">Cliente: <span className="primaryFontColor">{project.client}</span></p>
        </div>
        <div className="col-10 col-md-4 text-center">
         <p className="secondaryFontColor">Tipo Proyecto: <span className="primaryFontColor">{project.type === 'hour' ? 'Presupuesto por Hora' : 'Presupuesto Total'}</span></p> 
        </div>
        <div className="col-10 col-md-4 text-center">
          <p className="secondaryFontColor">Estado: <span className="primaryFontColor">{project.isDone ? 'Terminado' : 'En curso'}</span></p>
        </div>
      </div>
      <h4 className="text-center mt-3">Estadísticas</h4>
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
                noOptionsMessage={() => "Mes inválido"}
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
                title={`Horas por día del mes`}
                xLabel={"Dias"}
                yLabel={"Horas"}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row no-gutters justify-content-center">
            <div className="col-9 pt-2 pb-3">
            <CustomDoughtChart
                  data={weeksChartData.data}
                  labels={weeksChartData.labels}
                  title={'Horas por semana del mes'}
                  sublabel={'Semanas'}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDataDetails;
