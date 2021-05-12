import { db } from "../firebase";

interface ProjectType{
    name: string;
    client:string;
    description: string;
    amountXHour: number;
    estimatedHours: number;
    estimatedTotal: number;
    estimatedFinishDate?: string;
    creationDate: number;
}

interface TaskTime {
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
    isActive: boolean;
    creationDate: number;
    projectUid: string;
}

const addNewProjectToDB = async (project:ProjectType) => {
    try {
      setIsLoaderVisible(true);
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
      history.push("/projects");
    } catch (error) {
      console.log('No se pudo guardar proyecto en DB');
    }
  }

  const addNewTaskTime = async (task:TaskTime, projectUID: string) => {
    try {
      await db.collection("timetasks").add({
        description: task.description,
        hours: task.hours,
        minutes: task,
        seconds: task,
        projectUid: projectUID,
        creationDate: Date.now(),
        isDone: false
      });
    } catch (error) {
        console.log('No se puede guardar tarea en DB');
    }
  }

