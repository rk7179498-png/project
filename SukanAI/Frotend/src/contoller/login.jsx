import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import React from "react";
import { auth } from "../utils/firebase";
import api from "../utils/axios";

export default function Login() {
 





  const handleData = async (token) => {
    try {
      const { data } = await api.post("/auth/login", {
        token
      });
     

      console.log("LOGIN SUCCESS:", data.user);

    } catch (error) {
      console.log("ERROR:", error);
      console.log("MESSAGE:", error.message);
      console.log("RESPONSE:", error.response);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };

  const googleAuth = async () => {
  try {
    console.log("1. click hua");
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("2. popup success", result.user.email);

    const token = await result.user.getIdToken();
    console.log("3. token mila");

    const { data } = await api.post("/auth/login", { token });
    console.log("4. backend success", data);
  } catch (err) {
    console.log("ERROR CODE:", err.code);
    console.log("ERROR MSG:", err.message);
    console.log("RESPONSE:", err.response?.status, err.response?.data);
  }
};

  return (
    <div className="w-full bg-gray-300 text-2xl h-screen text-white flex justify-center items-center">

      <button
        className="bg-black w-[280px] h-14 rounded-2xl"
        onClick={googleAuth}
      >
        Continue With Google
      </button>

    </div>
  );
}