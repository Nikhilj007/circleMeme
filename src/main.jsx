import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/UserContext'
import {messaging, app} from './firebase'
import {  getToken } from "firebase/messaging";



// async function requestPermission() {
//   if (localStorage.getItem('notificationRequestMade')) {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//       try {
//         const token = await getToken(messaging, { vapidKey: 'BNAIysW2PdMAjLnInpZp384XGZx_GkNa8s182w5ixbkj_FkYf0IdlIkmAuplro1_L97kzjWKSH22iA1hS1bPzQk' });
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
  <BrowserRouter >
     {/* <BrowserRouter>  */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
