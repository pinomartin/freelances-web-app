import { useEffect, useState } from "react";
import { db } from "../firebase";
import { TasksListProps } from "../interfaces/tasklist";
import { TaskListItem } from "./TaskListItem";

export const TasksList = ({ projectUID, clientUID }: TasksListProps) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("timetasks")
    .where("userUID", "==", clientUID)
    .where("projectUID", "==", projectUID)
    .orderBy("creationDate", "desc")
    .onSnapshot((query:any) => {
      const tasks = query.docs.map((item:any) => ({
        id: item.id,
        ...item.data()}));
     setTasks(tasks);
    });
    return unsuscribe;
    
  }, [clientUID, projectUID]);

  const times = tasks.map((item:any) => 
   (item.seconds)
  );
  const totalSeconds = tasks.reduce((acc:number, seconds:any) => acc + seconds.seconds, 0);
  console.log(totalSeconds)

  const getMapFromArray = (tasks:any) =>
  tasks.reduce((acc:any, item:any) => {
    // add object key to our object i.e. charmander: { type: 'water' }
    acc[item] = { seconds: item.seconds, 
                        minutes: item.minutes,
                      hours: item.hours };
    return acc;
  }, {});

  console.log(getMapFromArray(tasks));



  return (
    <>
      <h3 className="text-center">Tiempos</h3>
      <div className="accordion" id="tasksAccordion">
      {tasks.length !== 0 ? tasks.map((item: any, index: number) => (
              <TaskListItem task={item} key={index} />
            )) : null}
  
      </div>
      
      <p>Tiempo total: </p>
    </>
  );
};
