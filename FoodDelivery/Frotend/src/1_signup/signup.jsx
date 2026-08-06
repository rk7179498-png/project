import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { server } from "../App";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { gooAuth } from "../2_firbase/firbase";
import { setUserData } from "../3_redux/userSlice";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);                
  const [err, setErr] = useState("");
  const usenavigate = useNavigate();
  const dispach = useDispatch();

  //! ======================//HandleSignup input//========================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 //* =====================================================================


  //! ======================// Fetch with signup//======================== 

  const connnectbak = async () => {
    try {
      const result = await axios.post(`${server}/api/signup`, formData, {
        withCredentials: true,
      });
      dispach(setUserData(result?.data?.user));
      console.log(result.data)
     
      setErr("");
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(`error kya hai beta ${error}`);
    }
  };

//* =====================================================================


 //! ======================//Fetch with google//======================== 
  
  const handleGoogleauth = async () => {
    if (!formData.mobile) {
      return setErr("mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(gooAuth, provider);
    try {
      const response = await axios.post( `${server}/api/google-auth`,
        {
          name: result.user.displayName,
          email: result.user.email,
          mobile: formData.mobile,
          role: formData.role,
        },
        { withCredentials: true },
      );
      dispach(setUserData(response?.data?.user));
    } catch (error) {
       setErr(error?.response?.data?.message);
      console.log(`error kya hai beta ${error}`);
    }
  };

  //* =====================================================================

  return (
    <div className="min-h-screen w-full bg-amber-100 flex justify-center items-center">
      <div className="h-[690px] w-[390px] rounded-2xl shadow-2xl bg-white">
        <h1 className="text-center mt-4 text-2xl font-medium">SIGNUP</h1>

        {/* NAME */}
        <div className="pl-5 mt-4">
          <label htmlFor="name" className="text-[20px] font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
            className="pl-1 mt-1 w-[90%] border-b-2 outline-none text-[19px]"
          />
        </div>

        {/* EMAIL */}
        <div className="pl-5 mt-4">
          <label htmlFor="email" className="text-[20px] font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            required
            onChange={handleChange}
            className="pl-1 mt-1 w-[90%] border-b-2 outline-none text-[19px]"
          />
        </div>

        {/* PASSWORD */}
        <div className="pl-5 mt-4">
          <label htmlFor="password" className="text-[20px] font-medium">
            Password
          </label>

          <div className="relative w-[90%]">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              required
              onChange={handleChange}
              className="pl-1 pr-12 mt-1 w-full border-b-2  text-[19px]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1 text-[20px] text-blue-600">
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        {/* mobile */}
        <div className="pl-5 mt-4">
          <label htmlFor="mobile" className="text-[20px] font-medium">
            Mobile
          </label>
          <input
            id="mobile"
            type=""
            name="mobile"
            value={formData.mobile}
            placeholder="Enter your email"
            required
            maxLength={10}
            onChange={handleChange}
            className="pl-1 mt-1 w-[90%] border-b-2 outline-none text-[19px]"
          />
        </div>
        {/* Role */}
        <div className="md-4">
          <label className="block text-[20px] font-medium pl-4 mt-3">
            Role
          </label>

          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: e }))}
                className="flex-1 px-3 py-2 border rounded-lg"
                style={
                  formData.role === e
                    ? { backgroundColor: "orange", color: "white" }
                    : { border: "1px solid orange", color: "orange" }
                }>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-5  ">
          <button
            className="px-6 cursor-pointer py-2 bg-blue-600 w-[90%] text-white rounded-lg "
            onClick={connnectbak}>
            Signup
          </button>
        </div>
        <p className="text-red-600 text-center">*{err}</p>
        <div className="flex justify-center mt-5 ">
          <button
            className="px-6 py-2  w-[90%] transition-colors border rounded-lg "
            onClick={handleGoogleauth}>
            <div className=" text-center flex justify-center items-center cursor-pointer">
              <FcGoogle className=" mr-2 text-[23px] " />
              sign In With Gooogle
            </div>
          </button>
        </div>
        <div className="text-center font-medium mt-3">
          <h2>
            Already have an account?
            <span
              className="text-orange-500 ml-2 cursor-pointer"
              onClick={() => {
                usenavigate("/login");
              }}>
              sign In
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
