import { useContext } from "react";
import { useState } from "react";
import { IoFastFood, IoSearchOutline, IoCartSharp } from "react-icons/io5";
import { dataContext } from "../Componant/ShowData";
import { useSelector } from "react-redux";

function Nav() {
  //  let {show,setShow}=useState(true)
  let item = useSelector((state) => state);

  const { show, setShow } = useContext(dataContext);

  return (
    <div className="fixed top-0 right-0 left-0">
      <div className="bg-slate-200 w-full h-full  flex text-center justify-between px-8 py-3 relative ">
        <div className="  w-[90px] h-[50px] flex items-center justify-center rounded-md shadow-x1  bg-white  cursor-pointer">
          {/* <IoFastFood className="text-green-500 w-[40px] h-[40px]" /> */}
          <span className="text-orange-400 text-[23px]">Food</span>
          <span>Zy</span>
        </div>
        <div className=" w-[70%] h-[50px] flex text-center bg-white  px-4 gap-4 rounded-md  ">
          <IoSearchOutline className="text-[20px] text-center  my-3.5" />
          <input
            type="text"
            placeholder="Search your dish"
            className="w-full text-[15px] h-[40px]  my-1.5 outline-none"
          />
        </div>
        <div
          className="w-[70px] h-[50px] flex text-center justify-center rounded-md shadow-x2 font-bold text-1.5xl  bg-white relative"
          onClick={() => {
            setShow(true);
          }}
        >
          <span className="absolute top-0 right-2 text-green-500">
            {item.Cart.length}
          </span>
          <IoCartSharp className="text-green-500 w-[40px] h-[40px] pt-2 " />
        </div>
      </div>
    </div>
  );
}

export default Nav;
