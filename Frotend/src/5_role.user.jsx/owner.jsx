import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import PageOfOwener from "../6_page/page";
import { useNavigate } from "react-router-dom";
import EditOwnerPage from "../6_page/editOwnerPage";
function Owner() {
  const Navigate =useNavigate()
  return (
    <div>
      
      <PageOfOwener />
      <div className="bg-white w-[40%]  m-auto mt-9 shadow-2xl rounded-2xl ">
        <div className="flex  justify-center items-center text-center text-5xl pt-7  ">
         <GiForkKnifeSpoon />
        </div>
        <h1 className="  text-center text-[22px] font-bold mt-3">
          Add Your Restaurant
        </h1>

        <div className="w-[90%] m-auto ">
          <p className="text-center  ">
            Join Our food delivery platform and reach thousands of hungry custromers every day 
          </p>
          <p className="text-center "></p>
          
        </div>
        <div className="text-center">
          <button className=" bg-red-500 w-34  text-[20px] rounded-2xl mt-4 mb-8"onClick={()=>Navigate("/create_edit_shop")}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Owner;
