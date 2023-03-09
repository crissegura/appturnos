// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8AxHjInmXopyPaPpVA0mTC0jAl84Wp48",
  authDomain: "navajalegendary.firebaseapp.com",
  projectId: "navajalegendary",
  storageBucket: "navajalegendary.appspot.com",
  messagingSenderId: "563374170872",
  appId: "1:563374170872:web:e0da9c4e8c6b2310f1510d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;