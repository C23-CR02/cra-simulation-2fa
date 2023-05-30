import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Inisialisasi Firebase
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

// Konfigurasi transporter Nodemailer

const App = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Mengambil dan menyimpan token perangkat saat komponen dimuat
    getToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM token:", currentToken);
        } else {
          console.log("No registration token available.");
        }
      })
      .catch((error) => {
        console.error("Error getting registration token:", error);
      });

// testing
    // Menerima dan menangani pesan yang diterima saat aplikasi berjalan
    onMessage(messaging, (payload) => {
      console.log("Received message:", payload);
      // Tambahkan logika penanganan pesan push di sini
      const { title, body } = payload.notification;
      alert(`${title}\n${body}`);
    });
  }, []);

  const sendPushNotification = (token, title, body) => {
    const message = {
      "to": token,
      "priority": "high",
      "soundName": "default",
      notification: {
        title,
        body,
      },
    };

    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer AAAA8yykx1E:APA91bFe_UxUMdiMKm0BBI7l42hKqEFkzDtqQdGTS9xHWPgIjysaJ5G1VtAyu8smbEyD59TKBN1jHmUhCh8pl6wgBLjYr8Juo-xV53paKIY37aTiA4sY-IDAyIssnruFTWfdrhULcvU3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send push notification.");
        }
        console.log("Push notification sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending push notification:", error);
      });
  };

  const handleSaveDraft = () => {
    const draftsRef = ref(database, "drafts");
    const newDraftRef = push(draftsRef);
    const draft = {
      email,
      subject,
      message,
    };

    set(newDraftRef, draft)
      .then(() => {
        console.log("Draft saved successfully!");

        // Mengirim notifikasi push ke perangkat Android
        getToken(messaging)
          .then((currentToken) => {
            if (currentToken) {
              sendPushNotification(
                currentToken,
                "Draft Email Disimpan",
                "Draft email telah berhasil disimpan."
              );
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((error) => {
            console.error("Error getting registration token:", error);
          });

        // Mengosongkan kolom input setelah pengiriman berhasil
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kirim Email</h1>
        <form>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Tujuan"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subjek"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pesan"
          ></textarea>
          <button type="button" onClick={handleSaveDraft}>
            Simpan Draft
          </button>
        </form>
      </header>
    </div>
  );
};

export default App;
