import { db } from "../firebase";

const getUserFromDB = async (uid: string | any) => {
  const dbUser = await db.collection("users").doc(uid).get();
  const dbUserData = await dbUser.data();
  return dbUserData;
};

const getProjectsFromUser = async (userId: string | any) => {
  const userprojects: any = await db
    .collection("projects")
    .where("userId", "==", userId)
    .orderBy("creationDate", "desc")
    .get();
  const userprojectsData = await userprojects.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userprojectsData;
};

const getProjectByID = async (projectID: string | any) => {
  const projectFromDB: any = await db
    .collection("projects")
    .doc(projectID)
    .get();
  const singleProject = await projectFromDB.data();
  return singleProject;
};

const getTasksFromProjectUser = async (userId: string, projectUID: string) => {
  const tasks: any = await db
    .collection("timetasks")
    .where("userUID", "==", userId)
    .where("projectUID", "==", projectUID)
    .orderBy("creationDate", "desc")
    .get();
  const userprojectsData = await tasks.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userprojectsData;
};

const streamTasksFromProject = (
  userId: string,
  projectUID: string,
  observer: any
) => {
  return db
    .collection("timetasks")
    .where("userUID", "==", userId)
    .where("projectUID", "==", projectUID)
    .orderBy("creationDate", "desc")
    .onSnapshot(observer);
};

const getAllTasksFromUser = async (userId: string) => {
  const tasks: any = await db
    .collection("timetasks")
    .where("userUID", "==", userId)
    .get();
  const userprojectsData = await tasks.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userprojectsData;
};



export {
  getUserFromDB,
  getProjectsFromUser,
  getProjectByID,
  getTasksFromProjectUser,
  streamTasksFromProject,
  getAllTasksFromUser
};
