// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI9cJln-UwthAKz1UBXT3TUdfJ8Wg7nBY",
  authDomain: "todoproject-7df7d.firebaseapp.com",
  projectId: "todoproject-7df7d",
  storageBucket: "todoproject-7df7d.appspot.com",
  messagingSenderId: "549820944783",
  appId: "1:549820944783:web:a1df9911e3eabc5a0cbbfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app) 

export {db , auth}