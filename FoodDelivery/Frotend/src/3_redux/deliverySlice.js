import { createSlice } from "@reduxjs/toolkit";

const deliveryBoy=createSlice({
    name:"deliveryBoy",
    initialState:{
        delivery:null,

    },
    reducers:{
        AddDeliveryBoy:(state,action)=>{
            state.delivery=action.payload
        },
        leaveDeliveryMean:(state)=>{
            state.delivery=null
        }

    }
})

export const {AddDeliveryBoy,leaveDeliveryMean}=deliveryBoy.actions
export default deliveryBoy.reducer