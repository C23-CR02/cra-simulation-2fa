importScripts(
  "https://www.gstatic.com/firebasejs/9.6.6/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.6/firebase-messaging-compat.js"
);

const firebaseConfig = {
  // Konfigurasi Firebase Anda di sini
  // ...
  apiKey: "AIzaSyD9bRK30d1TvluNamwSkLpo2O0T8lXiGzE",
  authDomain: "mobile-notification-90a3a.firebaseapp.com",
  databaseURL:
    "https://mobile-notification-90a3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobile-notification-90a3a",
  storageBucket: "mobile-notification-90a3a.appspot.com",
  messagingSenderId: "1044426049361",
  appId: "1:1044426049361:web:1fac2e5bbbdfd744a63570",
  measurementId: "G-HXZW0C7RLW",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
