import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  userData: null,
  myCity: null,
  myAddress: null,
  myState: null,
};
const creatSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setMyCity: (state, action) => {
      state.myCity = action.payload;
    },
    setMyAddress: (state, action) => {
      state.myAddress = action.payload;
    },
    setMyState: (state, action) => {
      state.myState = action.payload;
    },
    clearUserData:(state)=>{
       state.userData =null,
       state.myCity =null,
       state.myAddress =null,
       state.myState =null
      }
  },
});

export const { setUserData, setMyCity, setMyAddress, setMyState,clearUserData } = creatSlice.actions;

export default creatSlice.reducer;
