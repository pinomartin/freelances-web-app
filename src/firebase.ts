import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth' 


  const firebaseConfig = {
    apiKey: "AIzaSyAYihoPyuWjZLATGTid-2Jut-MlwGwIkyA",
    authDomain: "freelances-app.firebaseapp.com",
    projectId: "freelances-app",
    storageBucket: "freelances-app.appspot.com",
    messagingSenderId: "378275259550",
    appId: "1:378275259550:web:e69927d6902a8b978b078f"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore();
  const auth = app.auth();
  const provider = new app.auth.GoogleAuthProvider();

  

  export  {db , auth , provider } 

