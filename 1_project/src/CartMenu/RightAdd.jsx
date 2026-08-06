import React from "react";

import { useSelector } from "react-redux";
import RightShowAdd from "./RightShowAdd";
function RightAdd() {
  let item = useSelector((state) => state);
  let total = item.Cart.reduce(
    (total, item) => total + item.quty * item.price,
    0
  );
  let DeliveryFee = 30;
  let Texes = (total * 0.5) / 100;
  let TotalAmount = total + DeliveryFee + Texes;
  console.log(total);

  return (
    <div>
      <div>
        <div>
          {item.Cart.map((items) => (
            <RightShowAdd
              id={items.id}
              name={items.name}
              imge={items.img}
              price={items.price}
              quty={items.quty}
            />
          ))}
        </div>
      </div>
      {item.Cart.length > 0 ? (
        <div className="w-[80%] border-t-2  m-auto">
          <div className=" m-3 ">
            <div className="flex justify-between items-center    ">
              <h1>Subtotal</h1>
              <h2 className="text-green-400">Rs {total}/-</h2>
            </div>
            <div className="flex justify-between items-center   ">
              <h1>Dellivery</h1>
              <h2 className="text-green-400">Rs {DeliveryFee}/-</h2>
            </div>
            <div className="flex justify-between items-center   ">
              <h1>Texes</h1>
              <h2 className="text-green-400">Rs {Texes}/-</h2>
            </div>
          </div>
          <div className="w-[full] border-t-2  m-auto  ">
            <div className="flex justify-between items-center m-2  ">
              <h1 className="text-3xl">Total</h1>
              <h2 className="text-green-400 text-2xl">Rs {TotalAmount}/-</h2>
            </div>
            <div className="w-[full] border-2  m-auto flex justify-center items-center text-white bg-green-500 h-[40px] rounded-2xl hover:opacity-80 mt-5">
              <button className="text-[20px]">Place Order</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-3xl flex items-center justify-center h-[800px] ">
            <h1>Empty set</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightAdd;
