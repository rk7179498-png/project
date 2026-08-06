import axios from "axios";
import React from "react";
import { useState } from "react";
import { server } from "../App";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { gooAuth } from "../2_firbase/firbase";
import { useDispatch } from "react-redux";
import { setUserData } from "../3_redux/userSlice";
function login() {
  const [showPassword, setShowPassword] = useState(false);
  const usenavigate = useNavigate();
  const dispach = useDispatch();

  //! =======================//HandleSignup input//========================================

  const [fromData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//*==========================================================================


  //! ======================// Fetch with login//===========================
  // =>>>> Data DataBase me Jane ke Tayari or Redux me Store 
  const connect = async () => {
    try {
      let result = await axios.post(`${server}/api/login`, fromData, { withCredentials: true,});
      dispach(setUserData(result.data.user));
    } catch (error) {
      console.log(`axios problem ${error}`);
    }
  };

//*==========================================================================


//! ==================//=>>Google Baba Se Authorization Karne Ke liye

  const handleGoogleauth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(gooAuth, provider);
    try {
      const response = await axios.post( `${server}/api/google-Auth`,
        {
          name: result?.user?.displayName,
          email: result?.user?.email,
        },
        { withCredentials: true },
      );
      dispach(setUserData(response?.data?.user));

      console.log("Response from server:", response.data);
      // usenavigate("/");
    } catch (error) {
     console.log(`google baba ${error}`)
    }
  };
//* ==================================================================================

  return (
    <div className="min-h-screen bg-amber-100 flex justify-center items-center">
      <div className=" rounded-2xl shadow-2xl h-[350px] w-[300px] bg-white ">
        <div className="text-center mt-2 font-medium text-2xl">
          <h1>LogIn</h1>
        </div>
        <div className="ml-4">
          <label htmlFor="email" className="font-medium text-[18px] flex">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={fromData.email}
            placeholder="Enter a email"
            className="b border-b-2 outline-none pl-1 w-[90%]"
            onChange={handleChange}
          />
        </div>
        <div className="pl-5 mt-4">
          <label htmlFor="password" className="font-medium text-[18px] flex">
            Password
          </label>
          <div className="relative w-[90%]">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={fromData.password}
              placeholder="Enter a password"
              className="border-b-2 pl-1 w-full text-[19px] " // w-full
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1 text-[20px] text-blue-600"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

        <div
          className="text-right mr-5 mt-2 text-red-500 cursor-pointer"
          onClick={() => {
            usenavigate("/forgot-password");
          }}
        >
          Forgot password
        </div>
        <div className="flex justify-center items-center font-bold mt-3">
          <button
            className=" px-6 py-2 text-center cursor-pointer bg-amber-400 w-[90%] h-[40px] border rounded-lg"
            onClick={connect}
          >
            Login
          </button>
        </div>
        <div className="flex justify-center mt-5 ">
          <button
            className="px-6 py-1  w-[90%] transition-colors border rounded-lg "
            onClick={handleGoogleauth}
          >
            <div className=" text-center flex justify-center items-center cursor-pointer">
              <FcGoogle className=" mr-2 text-[23px] " />
              sign In With Gooogle
            </div>
          </button>
        </div>
        <div className="text-center mt-3 ">
          <h2 className="font-medium">
            Want to create a new account?{" "}
            <span
              className="text-yellow-500 cursor-pointer"
              onClick={() => {
                usenavigate("/signup");
              }}
            >
              signup
            </span>{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default login;
