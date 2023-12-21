/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kash-estate-app.firebaseapp.com",
  projectId: "kash-estate-app",
  storageBucket: "kash-estate-app.appspot.com",
  messagingSenderId: "574740373015",
  appId: "1:574740373015:web:799a79109c6c576dd18652"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);