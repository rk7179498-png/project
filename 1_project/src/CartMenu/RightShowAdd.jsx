import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  DeccrementQuty,
  IncrementQuty,
  RemoveItem,
} from "../redux/MenuSlice";
import RightAdd from "./RightAdd";

function RightShowAdd({ name, imge, price, id, quty }) {
  let dispatch = useDispatch();
  let item = useSelector((state) => state);

  return (
    <div>
      <div className="bg-white shadow w-[95%] h-[100px] m-4  rounded-2xl flex items-center justify-between p-4 ">
        <img src={imge} alt="" className="h-[80px] w-[150px] rounded-2xl " />

        <div>
          <h3>{name}</h3>
          <div className="bg-amber-300 w-[130px] justify-between flex  border-2 border-green-500 rounded-2xl mt-3">
            <button
              className="bg-white  w-[50px] rounded-tl-2xl rounded-bl-2xl text-[20px] font-t"
              onClick={() => {
                quty > 1 ? dispatch(DeccrementQuty(id)) : quty;
              }}
            >
              -
            </button>
            <span className="bg-[#e4dede] w-[40px] text-center pt-1">
              {quty}
            </span>
            <button
              className=" bg-white w-[50px] rounded-tr-2xl rounded-br-2xl"
              onClick={() => {
                dispatch(IncrementQuty(id));
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="h-[60px] w-[100px] pl-5">
          <h2 className="text-green-400">Rs:{price}/-</h2>

          <RiDeleteBin6Line
            className="text-red-700 text-[15px] flex  h-[20px] w-[100px] pl-9 mt-4 "
            onClick={() => {
              dispatch(RemoveItem(id));
              console.log(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightShowAdd;
