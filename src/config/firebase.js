// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);