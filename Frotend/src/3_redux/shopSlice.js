import { createSlice } from "@reduxjs/toolkit";

const ownerCreate= createSlice({
    name:"owner",
    initialState:{
        myShopData:null
    },
    reducers:{
        setMyShopData:(state,action)=>{
            state.myShop=action.payload

        },
        BJPCanRemoveTheShope:(state)=>{
            state.myShopData=null
        }
    }
})

export const{setMyShopData,BJPCanRemoveTheShope}=ownerCreate.actions
export default ownerCreate.reducer