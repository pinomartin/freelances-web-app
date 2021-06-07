import { db } from "../firebase";
import { ProjectType } from "../interfaces/project"
import { TaskTime } from "../interfaces/tasktime"
import { finishDateProcessorForm } from '../utils/parsetime/finishDateProcessorForm';

// const addNewProjectToDB = async (project:ProjectType, auth : any) => { //ver ese any
//     try {
//     //   setIsLoaderVisible(true);
//       await db.collection("projects").add({
//         userId: auth.currentUser?.email,
//         name: project.name,
//         client: project.client,
//         description: project.description,
//         amountXHour: project.amountXHour,
//         estimatedHours: project.estimatedHours,
//         estimatedTotal: project.estimatedTotal,
//         estimatedFinishDate: project.estimatedFinishDate,
//         creationDate: Date.now(),
//         isDone: false
//       });
//     //   history.push("/projects");
//     } catch (error) {
//       console.log('No se pudo guardar proyecto en DB');
//     }
//   }

  const updateProjectDB = async (project: ProjectType, projectUID: string) => {
    try {
      await db.collection("projects").doc(projectUID).update({
        name: project.name,
        client: project.client,
        description: project.description,
        amountXHour: project.amountXHour,
        estimatedHours: project.estimatedHours,
        estimatedTotal: project.estimatedTotal,
        estimatedHoursPerDay:project.estimatedHoursPerDay,
        estimatedFinishDate: finishDateProcessorForm(
          `${project.estimatedFinishDate}`
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteProject = async (id:string) => {
    try{
      await db.collection('projects').doc(id).delete();  
    }
    catch(error){
      console.log(error);
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
        startTimerDate: task.startTimerDate,
        stopTimerDate: task.stopTimerDate,
        isDone: task.isActive,
        userUID: task.clientUID,
      });
    } catch (error) {
        console.log('No se puede guardar tarea en DB');
    }
  }

  const updateTask = async (task:TaskTime, taskUID:string) => {
      try {
        await db.collection("timetasks").doc(taskUID).update({
          description: task.description
        })
        
      } catch (error) {
        console.log('No se pudo actualizar task en BD');
      }
  }
 

  const deleteTask = async (id:string) => {
    try{
      await db.collection('timetasks').doc(id).delete();  
    }
    catch(error){
      console.log(error);
    }
  }



  export { addNewTaskTimeToDB, deleteProject, deleteTask, updateProjectDB, updateTask}


