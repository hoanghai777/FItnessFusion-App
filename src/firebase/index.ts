import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsv32qRmjMmc6BALKCK1SI1itlhw8MsIg",
  authDomain: "sporty-app-e5be8.firebaseapp.com",
  projectId: "sporty-app-e5be8",
  storageBucket: "sporty-app-e5be8.appspot.com",
  messagingSenderId: "268194145212",
  appId: "1:268194145212:web:c88d0f3f4b2ee916ea01b9",
  measurementId: "G-5SHRGBXE5X",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
