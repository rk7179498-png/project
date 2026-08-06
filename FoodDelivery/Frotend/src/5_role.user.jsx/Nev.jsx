import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import UserGatecity from "../4_current.user.jsx/userGatecity";
import axios from "axios";
import { server } from "../App";
import { clearUserData, setUserData } from "../3_redux/userSlice";


function Nev() {
  const { userData, myCity } = useSelector((state) => state.user);
  console.log(myCity);
  
  const [show, setShow] = useState(false);
  const dispach = useDispatch();
  const heandelLogOut = async () => {
    try {
      const result = await axios.get(`${server}/api/logout`, {
        withCredentials: true,
      });
      dispach(clearUserData());
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-[90%] mx-auto">
      <div className="  w-full h-[60px] flex justify-between gap-6 ">
        <div className="flex justify-center items-center ml-9 font-medium text-[18px] mt-4 ">
          <h2>FoodZ</h2>
        </div>
        <div className="flex gap-8 items-center font-medium text-[18px] rounded-2xl  bg-white w-[550px] h-[40px] mt-4 ">
          <div className=" flex ml-3.5 text-[20px] items-center gap-1 cursor-pointer ">
            <FaLocationDot className="text-red-600" />
            <h2 className="text-orange-400">{myCity}</h2>
          </div>
          <div className=" flex items-center gap-4 text-[20px] h-[90%] w-[70%]">
            <FaSearch className="ml-2 " />
            <input
              type="text"
              placeholder="Search delicious food"
              className="outline-none border-none"
            />
          </div>
        </div>
        <div className=" w-[150px] justify-around flex items-center cursor-pointer mt-3 ">
          <div className=" flex relative  w-[50px] h-[40px] items-center ">
            <FaCartShopping className="text-2xl" />
            <span className="absolute right-3 bottom-4 text-[15px] font-medium ">
              0
            </span>
          </div>
          <div className="bg-orange-600 rounded-[50%] h-[40px] w-[40px] flex items-center  justify-center ">
            <h2
              className="font-medium text-[18px]"
              onClick={() => setShow((perv) => !perv)}
            >
              {userData?.name.slice(0, 1)}
            </h2>
          </div>
        </div>
      </div>
      {show && (
        <div className="bg-amber-50 h-[150px] w-[250px] mt-3 ml-[86%] ">
          <div className="pt-4 pl-5 ">
            <h2>
              Name: <span className="text-blue-600 pl-2">{userData?.name}</span>
            </h2>
            <h2>
              Email:{" "}
              <span className="text-blue-600 pl-2">{userData?.email}</span>
            </h2>
            <h2>
              Email:{" "}
              <span className="text-blue-600 pl-2">{userData?.mobile}</span>
            </h2>
            <button
              className=" text-center text-red-400 font-medium  mt-4 ml-11 text-[20px] "
              onClick={heandelLogOut}
            >
              Log out
            </button>
          </div>
        </div>
      )}
      <UserGatecity />
    </div>
  );
}

export default Nev;
