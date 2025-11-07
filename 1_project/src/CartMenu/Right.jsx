import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";

import { dataContext } from "../Componant/ShowData";
import RightAdd from "./RightAdd";
export default function Right() {
  const { show, setShow } = useContext(dataContext);
  return (
    <div
      className={`w-[40vw] h-[100%] fixed right-0 border-0 bg-white top-0 cursor-pointer overflow-auto ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className={`pt-7 pl-8 text-2xl  text-green-400 flex items-center justify-between
            
          `}
      >
        {" "}
        <h3>Order Items</h3>
        <div className="pr-8 text-2xl">
          <RxCross2
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
      </div>
      <RightAdd />
    </div>
  );
}
