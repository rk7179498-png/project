import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Logs all env variables available in frontend


const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FIREBASE_KEY, 
  authDomain: "food-delivery-c11df.firebaseapp.com",
  projectId: "food-delivery-c11df",
  storageBucket: "food-delivery-c11df.firebasestorage.app",
  messagingSenderId: "925885148354",
  appId: "1:925885148354:web:a0358ebeb9fbbc620c9f5b"
};

const app = initializeApp(firebaseConfig);
export const gooAuth = getAuth(app);





