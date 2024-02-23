import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCGdJHXBnAV117MhgASVAWWrUCAjsoRKvY",
  authDomain: "circle-new-17712.firebaseapp.com",
  projectId: "circle-new-17712",
  storageBucket: "circle-new-17712.appspot.com",
  messagingSenderId: "714703993134",
  appId: "1:714703993134:web:40f71db8bcb13aa70422bf",
  measurementId: "G-E30GBVPSJH"
};
  
export  const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);