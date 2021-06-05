import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { getProjectsFromUser, getUserFromDB } from "../firebaseUtils/getFirestoreData"; 

export const FreelancesContext = React.createContext<any>({});

export const FreelancesProvider = (props:any) => {

    const initialUserData = {uid: '', displayName: '', photoURL: '' , email: ''} //Initial Data

    const [userDB, setUserDB] = useState(initialUserData);
    const [authUser, setAuthUser] = useState<any>(null);
    const [projects, setProjects] = useState<any>(null);

    const userDetector = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                setAuthUser(user);
                // setUser({uid: user.uid, email: user.email, displayName: user.displayName , state: true})
                getUserFromDB(user.email).then(user => {
                    setUserDB({
                        uid: user?.uid, displayName: user?.userName, photoURL: user?.profilePhotoURL , email: user?.email
                    })
                })
                getProjectsFromUser(user.email).then((projects) => setProjects(projects));
            }else{
                setUserDB({uid: '', displayName: '', photoURL: '' , email: ''});
                setAuthUser(null);
                setProjects(null);
            }
        })
    }
    

    useEffect(() => {
        userDetector()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const userLogin = async () => {
        try {
            await auth.signInWithPopup(provider)
        } catch (error) {
            console.log(error)
        }
    }

    const userSignOut = async () => {
        auth.signOut()
    }

    // const loadMessagesFromDB = () => {
    //     db.collection('chat').orderBy('date')
    //     .onSnapshot(query => {
    //      const messages:any= query.docs.map(item => item.data())
    //      setMessages(messages)
    //     })
    // }

    // const addMessage = async(uidChat, textInput) => {
    //     try {
    //         await db.collection("chat").add({
    //             date: Date.now(),
    //             text: textInput,
    //             uid: uidChat,
    //             displayName: user.displayName
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



    return (
            <FreelancesContext.Provider value={{userDB, authUser, userLogin, userSignOut, projects}}>
                {props.children}
            </FreelancesContext.Provider>
    )
// }
}

export default FreelancesProvider;