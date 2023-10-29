import { getDatabase, onValue, ref } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs3WhurypfQ2v_tBBtxrGb48L8FLUzgTE",
  authDomain: "world-history-37f9a.firebaseapp.com",
  databaseURL: "https://world-history-37f9a-default-rtdb.firebaseio.com",
  projectId: "world-history-37f9a",
  storageBucket: "world-history-37f9a.appspot.com",
  messagingSenderId: "441339132606",
  appId: "1:441339132606:web:96b46c9c837beb4784fcef",
  measurementId: "G-DNLNQSVG5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase();

// export const getQuestions = ref(database, '/');

