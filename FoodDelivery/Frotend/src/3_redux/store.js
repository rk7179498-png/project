import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import ownerReducer from "./shopSlice";
import deliveryReducer from "./deliverySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    delivery: deliveryReducer,
  },
});