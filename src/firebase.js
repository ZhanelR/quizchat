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

const quizConfig = {
  apiKey: "AIzaSyA8xFZT6gpNepwuQIRTCFtmOPzv7sDcDI0",
  authDomain: "lab3-quiz-quizes.firebaseapp.com",
  projectId: "lab3-quiz-quizes",
  storageBucket: "lab3-quiz-quizes.appspot.com",
  messagingSenderId: "70342173272",
  appId: "1:70342173272:web:1d1be9ce9d05d1965d202d"
};

    const firebaseConfig = {
    authConfig,
    firestoreConfig,
    quizConfig
  };

  if (!process.env.FIREBASE_FUNCTIONS_EMULATOR) {
    initializeApp(firebaseConfig);
  }

  const app = initializeApp(authConfig, "authFirebase");
  const db = getFirestore(app);
  const auth = getAuth(app);
  
/*   const appFirestore = initializeApp(firebaseConfig.firestoreConfig, "firestore");
  const dbFirestore = getFirestore(appFirestore); */
  const appFirestore = initializeApp(firestoreConfig, "firestore");
  const dbFirestore = getFirestore(appFirestore); 

/*   const appQuiz = initializeApp(firebaseConfig.quiz, "quizFirebase"); 
  const dbQuiz = getFirestore(appQuiz);  */
  const appQuiz = initializeApp(quizConfig, "quizFirebase");
  const dbQuiz = getFirestore(appQuiz);
  
  export { auth, db, dbFirestore, dbQuiz };
  