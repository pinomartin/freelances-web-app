import { useEffect, useState } from "react";
import { getTasksFromProjectUser } from "../firebaseUtils/getFirestoreData";
import { TasksListProps } from "../interfaces/tasklist";
import { TaskListItem } from "./TaskListItem";

export const TasksList = ({ projectUID, clientUID }: TasksListProps) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasksFromProjectUser(clientUID, projectUID).then((tasks) =>
      setTasks(tasks)
    );
  }, [clientUID, projectUID]);

  return (
    <>
      <h3 className="text-center">Tiempos</h3>
      <div className="accordion" id="tasksAccordion">
      {tasks.length !== 0 ? tasks.map((item: any, index: number) => (
              <TaskListItem data={item} key={index} />
            )) : null}
  
      </div>
      <p>Tiempo total: </p>
    </>
  );
};
