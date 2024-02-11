import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/UserContext'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from 'react'

const firebaseConfig = {
  apiKey: "AIzaSyCt5af8h9sDVEC8_WNyB3_-ns-VceabjlQ",
  authDomain: "circle-50c68.firebaseapp.com",
  projectId: "circle-50c68",
  storageBucket: "circle-50c68.appspot.com",
  messagingSenderId: "125020355409",
  appId: "1:125020355409:web:5e3169f3edfd0714607170",
  measurementId: "G-DV9RKGDCHC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// async function requestPermission() {
//   if (localStorage.getItem('notificationRequestMade')) {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//       try {
//         const token = await getToken(messaging, { vapidKey: 'BL5v6Rrd6sUV_Zl_NeDWMvNfwj3cr7IoNczHWr-HwRpU-FCMQpAMUuTQlZgCxaBPxToU6iK32GNZUZzhB6e6L-E' });
//         console.log("FCM token:", token);
//         localStorage.setItem('fcmToken', token);
//       } catch (error) {
//         console.error("Error generating token:", error);
//       }
//       localStorage.setItem('notificationRequestMade', 'true');
//     } else if (permission === 'denied') {
//       console.log('Notification permission denied.');
//     }
//   } else {
//     console.log('Notification request already made, skipping...', localStorage.getItem('fcmToken'));
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   requestPermission();
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter basename="/home">
   <BrowserRouter> 
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
