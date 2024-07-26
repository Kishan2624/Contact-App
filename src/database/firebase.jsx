// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "contact-info-22a04.firebaseapp.com",
  projectId: "contact-info-22a04",
  storageBucket: "contact-info-22a04.appspot.com",
  messagingSenderId: "99939040029",
  appId: "1:99939040029:web:41791c569b033a770efff4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
