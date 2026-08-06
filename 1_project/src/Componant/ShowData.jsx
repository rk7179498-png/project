import React, {  children , createContext, useState } from "react";


export const dataContext= createContext()

export default function ShowData({ children }) {
  let [show, setShow] = useState(false);
 
  let data ={
    show,
    setShow
  }
  return (
    <div>
      <dataContext.Provider value={data}>
        { children }
      </dataContext.Provider>
      
      
    </div>
  );
}
