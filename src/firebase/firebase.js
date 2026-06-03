import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let messaging = null;

const initMessaging = async () => {
  const supported = await isSupported();
  if (supported && "serviceWorker" in navigator) {
    messaging = getMessaging(app);

    // Aguarda o service worker já registrado pelo serviceWorkerRegistration.js
    const registration = await navigator.serviceWorker.ready;
    messaging.swRegistration = registration;
  }
};

initMessaging();

export { app, messaging };