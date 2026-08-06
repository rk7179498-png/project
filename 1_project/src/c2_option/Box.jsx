import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/MenuSlice";
export default function Box({ name, Category, type, img, price, id, quty }) {
  let dispatch = useDispatch();
  return (
    <div>
      <div
        className="bg-white h-[330px] w-[250px]  rounded-[1.3rem] mt-3 
             shadow-md hover:shadow-lg transition-all duration-200 
             border-3 border-transparent hover:border-green-500 
"
      >
        <img
          src={img}
          alt=""
          className=" h-40 w-full text-5xl text-center p-2 rounded-[1.3rem] flex  items-center "
        />
        <h3 className="text-2xl pl-4">{name}</h3>
        <h3 className="text-2xl pl-4">{Category}</h3>
        <div className="pt-3 flex justify-between items-center">
          <p className="text-[15px] pl-4 text-red-500 text-2xl">
            Rs:- {price} /
          </p>
          <div className="  gap-2 flex items-center pr-4 text-green-500 text-lg ">
            {type === "veg" ? (
              <LuLeafyGreen className="text-green-600 text-xl" />
            ) : (
              <GiChickenOven className="text-red-600 text-xl" />
            )}
            <span className="">{type}</span>
          </div>
        </div>
        <div className="p-2 pb-2 ">
          <button
            className="bg-green-300 w-full h-[40px] rounded-md"
            onClick={() => {
              dispatch(
                AddItem({ name, Category, type, img, price, id, quty: 1 })
              );
              console.log("click");
            }}
          >
            Add a Dish
          </button>
        </div>
      </div>
    </div>
  );
}
