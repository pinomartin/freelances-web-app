import { db, storage } from "../firebase";
import { ProjectType } from "../interfaces/project"
import { TaskTime } from "../interfaces/tasktime"
import { HelpMessageProps } from '../interfaces/helpMessage';
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
  };

  const finishProjectDB = async (projectUID: string, finishDate:number) => {
    try {
      await db.collection("projects").doc(projectUID).update({
        // name: project.name,
        // client: project.client,
        // description: project.description,
        // amountXHour: project.amountXHour,
        // estimatedHours: project.estimatedHours,
        // estimatedTotal: project.estimatedTotal,
        // estimatedHoursPerDay:project.estimatedHoursPerDay,
        // estimatedFinishDate: finishDateProcessorForm(
        //   `${project.estimatedFinishDate}`
        // ),
        isDone: true,
        realFinishDate: finishDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        isFastHourCharge: task.isFastHourCharge,
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
    
    
    const deleteTask = async (id:string | undefined) => {
      try{
        await db.collection('timetasks').doc(id).delete();  
      }
      catch(error){
        console.log(error);
      }
    }

    const addFastBurnHourToDB = async(projectUID:string, creationDate:string) => {
      try {
        await db.collection('fastburnhours').doc(projectUID).set({
          creationDate: creationDate
        })
      } catch (error) {
        console.log('No se pudo guardar hora rapida en DB')
      }
    }

    
    const addExpenseToDB = async (expense:any):Promise<any> => {
      try {
        await db.collection("expenses").add({
          description: expense.description,
          amount: expense.amount,
          projectUID: expense.projectUID,
          userUID: expense.clientUID,
        });
      } catch (error) {
          console.log('No se puede guardar gasto en DB');
      }
    }

    const deleteExpense = async (id:string) => {
      try{
        await db.collection('expenses').doc(id).delete();  
      }
      catch(error){
        console.log(error, 'No se pudo eliminar Gasto de DB');
      }
    }

  const addQuestionHelpToDB = async (question:HelpMessageProps):Promise<any> => {
    try {
      await db.collection("questions").add({
        name: question.name,
        email: question.email,
        question: question.question
      });
    } catch (error) {
        console.log('No se puede guardar tarea en DB');
    }
  };

  const updateUserProfilePhoto = async (userEmail:string, updatedImage:any) => {

    try {
        const imgRef = await storage.ref().child(userEmail).child('Profile Photo');
        await imgRef.put(updatedImage);
        const imgURL = await imgRef.getDownloadURL(); 

        console.log(imgURL)

        await db.collection("users").doc(userEmail).update({
          profilePhotoURL: imgURL
        });
        return imgURL;

    } catch (error) {
        console.log(error, "No se pudo guardar nueva foto de perfil")
    }

};

  const updateUserName = async (name:string, userEmail:string) => {
    try {
      await db.collection("users").doc(userEmail).update({
        userName: name
      });

      return name;
      
    } catch (error) {
        console.log(error, "No se pudo actualizar el nombre de Usuario");
    }
  }



  export { addNewTaskTimeToDB, deleteProject, deleteTask, updateProjectDB, finishProjectDB, updateTask, addFastBurnHourToDB, addQuestionHelpToDB, addExpenseToDB, deleteExpense, updateUserProfilePhoto, updateUserName }


