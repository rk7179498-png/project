import React from "react";
import { FaClipboardList } from "react-icons/fa";

import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
function PageOfOwener() {
  const {userData}=useSelector((state)=>state.user)
  const{myShopData}=useSelector((state)=>state.owner)
  return (
    <div className="  ">
      <div className="  w-full text-center flex justify-center m-auto pt-3 flex gap-5 ">
        <h1 className="ml-7 text-2xl font-bold text-red-500">FoodZ</h1>
        {myShopData && <span className="flex  items-center  bg-red-400 font-medium rounded-2xl w-25  justify-center">
          <IoMdAdd />
          Add Food Item
        </span>}
        
        <span className="flex  items-center bg-red-400 font-medium rounded-2xl w-25  justify-center">
         <FaClipboardList />
          My Orders
        </span>
        <span className="flex  items-center bg-red-400 font-medium h-8 w-8 rounded-2xl   justify-center">
          {userData?.name.slice(0, 1)}
        </span>
      </div>
      
    </div>
  );
}

export default PageOfOwener;
