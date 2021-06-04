import { useEffect, useState } from "react";
import { streamTasksFromProject } from "../firebaseUtils/getFirestoreData";
import { TasksListProps } from "../interfaces/tasklist";
import { ProjectType } from "../interfaces/project";
import { TaskListItem } from "./TaskListItem";
import { formatDuration } from "date-fns";
import formatISO from "date-fns/formatISO";
import { es } from "date-fns/esm/locale";

export const TasksList = ({ projectUID, clientUID, projectData }: TasksListProps) => {

  const { amountXHour }:any = projectData;

  const [tasks, setTasks] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeToString, setTimeToString] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);

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

  const getEstimatedAmount = (seconds: number, amountPerHour: number):number => {
      const hourPortion = seconds / 3600;
      const estimatedTotalAmount = Number((hourPortion * amountPerHour).toFixed(2));

      return estimatedTotalAmount;
  }

  // useEffect(() => {
  //   const unsuscribe = db
  //     .collection("timetasks")
  //     .where("userUID", "==", clientUID)
  //     .where("projectUID", "==", projectUID)
  //     .orderBy("creationDate", "desc")
  //     .onSnapshot((query: any) => {
  //       const tasks = query.docs.map((item: any) => ({
  //         id: item.id,
  //         ...item.data(),
  //       }));
  //       setTasks(tasks);
  //       getTotalSecondsFromTasks(tasks).then(seconds => setTotalSeconds(seconds));
  //       setTimeToString(getTotalTimeperProject(totalSeconds));
  //     });
  //   return unsuscribe;
  // }, [clientUID, projectUID]);

  useEffect(() => {
    const unsubscribe = streamTasksFromProject(clientUID, projectUID, {
      next: (querySnapshot: any) => {
        const updatedTasksItems = querySnapshot.docs.map(
          (docSnapshot: any) => ({ id: docSnapshot.id, ...docSnapshot.data() })
        );
        setTasks(updatedTasksItems);
      },
      error: () => console.log("task-list-item-failed"),
    });

    return unsubscribe;
  }, [clientUID, projectUID, setTasks, setTotalSeconds]);

  useEffect(() => {
    getTotalSecondsFromTasks(tasks).then((seconds) => setTotalSeconds(seconds));
    setTimeToString(getTotalTimeperProject(totalSeconds));
    setEstimatedTotal(getEstimatedAmount(totalSeconds, amountXHour));
  }, [tasks, totalSeconds]);

  const totalSeconds1 = tasks.reduce(
    (acc: number, seconds: any) => acc + seconds.seconds,
    0
  );
  const totalMinutes = tasks.reduce(
    (acc: number, minutes: any) => acc + minutes.minutes,
    0
  );
  const totalHours = tasks.reduce(
    (acc: number, hours: any) => acc + hours.hours,
    0
  );

  // console.log(formatISO(dateHelper, {representation: 'time'}).substr(0,8));

  // const getMapFromArray = (tasks:any) =>
  // tasks.reduce((acc:any, item:any) => {
  //   // add object key to our object i.e. charmander: { type: 'water' }
  //   acc[item] = { seconds: item.seconds,
  //                       minutes: item.minutes,
  //                     hours: item.hours };
  //   return acc;
  // }, {});

  // console.log(getMapFromArray(tasks));
  // console.log(totalHours, totalMinutes, totalSeconds1);

  return (
    <>
      <h3 className="text-center">Tiempos</h3>
      <div className="accordion" id="tasksAccordion">
        {tasks.length !== 0 ? (
          tasks.map((item: any) => (
            <>
              <TaskListItem task={item} key={item.id} />
            </>
          ))
        ) : (
          <>
            <div className="alert alert-warning">
              Aun no tienes tiempos cargados
            </div>
          </>
        )}
      </div>
      <div className="row justify-content-center">
          {tasks.length !== 0 && (<p>Tiempo total: {timeToString}</p>)}
      </div>
      <div className="row justify-content-center">
          {tasks.length !== 0 && (<p>Monto a cobrar: ${estimatedTotal}</p>)}
      </div>
    </>
  );
};
