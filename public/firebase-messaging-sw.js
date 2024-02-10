importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCt5af8h9sDVEC8_WNyB3_-ns-VceabjlQ",
  authDomain: "circle-50c68.firebaseapp.com",
  projectId: "circle-50c68",
  storageBucket: "circle-50c68.appspot.com",
  messagingSenderId: "125020355409",
  appId: "1:125020355409:web:5e3169f3edfd0714607170",
  measurementId: "G-DV9RKGDCHC",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
