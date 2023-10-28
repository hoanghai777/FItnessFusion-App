import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlNuq7P0-W2vwd0jgTZwTGDaNFSYBcOF4",
  authDomain: "sporty-hoang-hai.firebaseapp.com",
  projectId: "sporty-hoang-hai",
  storageBucket: "sporty-hoang-hai.appspot.com",
  messagingSenderId: "305225659046",
  appId: "1:305225659046:web:70b479b1e88be8e57e3a67",
  measurementId: "G-D4WDH9F4J4"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
