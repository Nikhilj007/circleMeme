import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCt5af8h9sDVEC8_WNyB3_-ns-VceabjlQ",
    authDomain: "circle-50c68.firebaseapp.com",
    projectId: "circle-50c68",
    storageBucket: "circle-50c68.appspot.com",
    messagingSenderId: "125020355409",
    appId: "1:125020355409:web:5e3169f3edfd0714607170",
    measurementId: "G-DV9RKGDCHC"
  };
  
export  const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);