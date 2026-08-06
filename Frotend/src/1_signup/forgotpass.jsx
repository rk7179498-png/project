import { useState } from "react";
import axios from "axios";
import { server } from "../App";
import { useNavigate } from "react-router-dom";

function forgotpass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${server}/api/send-otp`,
        { email },
        { withCredentials: true }
      );

      console.log("OTP sent:", result.data);
      setStep(2);
    } catch (error) {
      console.log(`sendotp ${error}`);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${server}/api/verify-otp`,
        { email,otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(`varify otp ${error}`);
    }
  };
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${server}/api/reset-pass`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-red-200 justify-center items-center w-full min-h-screen">
      <div className="w-[250px] shadow-2xl ">
        <div className="text-center">
          <h2 className=" text-red-600 text-[20px] font-bold">
            Forgot Password
          </h2>
        </div>
        {step == 1 && (
          <div>
            <div className="pl-3 ">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter a email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="pl-2 mt-2 border w-[90%]"
              />
            </div>
            <button
              className="bg-orange-300 rounded-2xl w-[90%] mt-2 mb-4 h-[30px] ml-2 cursor-pointer "
              onClick={handleSendOtp}
            >
              <h2>SendOTP</h2>
            </button>
          </div>
        )}
        {step == 2 && (
          <div>
            <div className="pl-3 ">
              <label htmlFor="otp" className="">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                name="otp"
                placeholder="OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                className="pl-2 mt-2 border w-[90%]"
              />
            </div>
            <button
              className="bg-orange-300 rounded-2xl w-[90%] mt-2 mb-4 h-[30px] ml-2 cursor-pointer "
              onClick={handleVerifyOtp}
            >
              <h2 className="font-medium">Varify</h2>
            </button>
          </div>
        )}
        {step == 3 && (
          <div>
            <div className="pl-3 ">
              <label htmlFor="password" className="">
                New Password
              </label>
              <div className="w-[90%] relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  className="pl-2 mt-2 border w-full"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="pl-3 mt-2 ">
              <label htmlFor="password" className="">
                confirm Password
              </label>
              <div className="w-[90%] relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="pl-2 mt-2 border w-full"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              className="bg-orange-300 rounded-2xl w-[90%] mt-2 h-[30px] ml-2 mb-4 mt-4 cursor-pointer "
              onClick={handleResetPassword}
            >
              <h2 className="font-medium">Reset Password</h2>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default forgotpass;
