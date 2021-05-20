import { db } from "../firebase";

import { ProjectType } from "../interfaces/project"
import { TaskTime } from "../interfaces/tasktime"

const addNewProjectToDB = async (project:ProjectType, auth : any) => { //ver ese any
    try {
    //   setIsLoaderVisible(true);
      await db.collection("projects").add({
        userId: auth.currentUser?.email,
        name: project.name,
        client: project.client,
        description: project.description,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        estimatedFinishDate: project.estimatedFinishDate,
        creationDate: Date.now(),
        isDone: false
      });
    //   history.push("/projects");
    } catch (error) {
      console.log('No se pudo guardar proyecto en DB');
    }
  }

  const addNewTaskTimeToDB = async (task:TaskTime):Promise<any> => {
    try {
      await db.collection("timetasks").add({
        description: task.description,
        hours: task.hours,
        minutes: task.minutes,
        seconds: task.seconds,
        projectUID: task.projectUID,
        creationDate: task.creationDate,
        isDone: task.isActive,
        userUID: task.clientUID,
      });
    } catch (error) {
        console.log('No se puede guardar tarea en DB');
    }
  }
 

  export { addNewTaskTimeToDB }


