// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0MXIppQJ_bHU3q6T4mkxcXwuiF_CjVtM",
  authDomain: "reactauth-4d6ed.firebaseapp.com",
  projectId: "reactauth-4d6ed",
  storageBucket: "reactauth-4d6ed.appspot.com",
  messagingSenderId: "696262376705",
  appId: "1:696262376705:web:42df1d5dc60a9f8d06ef00"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
