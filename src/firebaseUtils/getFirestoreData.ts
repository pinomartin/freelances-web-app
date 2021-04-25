import {db} from '../firebase';

const getUserFromDB = async (uid: string | any) => {
    const dbUser = await db.collection("users").doc(uid).get();
    const dbUserData = await dbUser.data()
    return dbUserData;
  };

export {getUserFromDB};