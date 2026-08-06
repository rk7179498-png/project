import{configureStore} from "@reduxjs/toolkit"
import MenuReducer from "./MenuSlice"
export const MenuStore =configureStore({
    reducer:{
        Cart:MenuReducer
    }
})