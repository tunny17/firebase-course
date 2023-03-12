import { initializeApp } from "firebase/app";
// this function sets up authentication inside the project
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyALbIRFm3UfMf4Z5hjSe1AfBgbhv78PbeI",
  authDomain: "fir-course-e0bb6.firebaseapp.com",
  projectId: "fir-course-e0bb6",
  storageBucket: "fir-course-e0bb6.appspot.com",
  messagingSenderId: "14154140386",
  appId: "1:14154140386:web:5e91e006e9c6b74612ecbb",
  measurementId: "G-BFQTPLCBJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);