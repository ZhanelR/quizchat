import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const authConfig = {
    apiKey: "AIzaSyBk3wAvk9KekkeG2hdJBUP58z2BHsvosf0",
    authDomain: "lab-3-auth.firebaseapp.com",
    projectId: "lab-3-auth",
    storageBucket: "lab-3-auth.appspot.com",
    messagingSenderId: "782456404033",
    appId: "1:782456404033:web:00883db51998f976aaaec0"
};

const firestoreConfig = {
  apiKey: "AIzaSyAOC4YvgrYQ3XVCA71biVFR6a7Qo1J8mGQ",
  authDomain: "lab3-messages.firebaseapp.com",
  projectId: "lab3-messages",
  storageBucket: "lab3-messages.appspot.com",
  messagingSenderId: "1073627537939",
  appId: "1:1073627537939:web:5ca730caf98a358ec555e6"
}

    const firebaseConfig = {
    authConfig,
    firestoreConfig
  };


  const app = initializeApp(authConfig, "authFirebase");
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  const appFirestore = initializeApp(firebaseConfig.firestoreConfig, "firestore");
  const dbFirestore = getFirestore(appFirestore);
  
  export { auth, db, dbFirestore };
  