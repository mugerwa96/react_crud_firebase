// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyAzbHGneVQANdaBOvQIlXhHkTaPPvG09C4",
  authDomain: "react-30666.firebaseapp.com",
  projectId: "react-30666",
  storageBucket: "react-30666.appspot.com",
  messagingSenderId: "246267179642",
  appId: "1:246267179642:web:ac1d58b7654950633081c3"
};


// Initialize Firebase
 const app = initializeApp(firebaseConfig);

//  firestore

export const db= getFirestore(app)
