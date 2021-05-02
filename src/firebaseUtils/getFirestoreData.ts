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

export { getUserFromDB, getProjectsFromUser };
