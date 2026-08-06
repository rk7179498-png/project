import { useState } from "react";
import { Food } from "../Food/food";
import Box from "./Box";
import { RxCross2 } from "react-icons/rx";
import List from "../Food/List";
import Right from "../CartMenu/Right";

export default function Boxprops() {
  let [Cet, setCet] = useState(Food);
  function filter(Category) {
    //?------------------------------------
    if (Category === "All") {
      setCet(Food);
    } else {
      let newList = Food.filter((item) => item.food_category === Category);
      setCet(newList);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-slate-200 mt-18 ">
        {List.map((item, id) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center w-[120px] h-[120px] bg-white rounded-xl shadow-md hover:bg-green-200 shadow-lg cursor-pointer transition"
            onClick={() => filter(item.name)}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      <div className="flex w-[100%] flex-wrap gap-7 justify-center items-center px-5  m-auto">
        {Cet.map((props, id) => (
          <div>
            <Box
              name={props.food_name}
              Category={props.food_category}
              type={props.food_type}
              img={props.food_image}
              price={props.price}
              id={props.id}
            />
          </div>
        ))}
      </div>
      <Right />
    </div>
  );
}
