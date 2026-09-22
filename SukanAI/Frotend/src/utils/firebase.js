import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sukanai.firebaseapp.com",
  projectId: "sukanai",
  storageBucket: "sukanai.firebasestorage.app",
  messagingSenderId: "536934876471",
  appId: "1:536934876471:web:1b61a70697900d5c3ec6b2",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);