import{createSlice} from "@reduxjs/toolkit"

const MenuSlice =createSlice({
    name:"Cart",
    initialState:[],
    reducers:{
        AddItem:(state,action)=>{
         const update = state.find((item) => item.id === action.payload.id);
            if(update){
                return state.map((item)=>item.id===action.payload.id?{...item,quty:item.quty+1}:item)
            }else{
                state.push(action.payload)
            }
            
        },
        RemoveItem:(state,action)=>{
        return    state.filter((item)=>(
                item.id!==action.payload
            ))
        },
        IncrementQuty:(state,action)=>{
            return state.map((item)=>item.id===action.payload?{...item,quty:item.quty+1}:item)
        },
         DeccrementQuty:(state,action)=>{
            return state.map((item)=>item.id===action.payload?{...item,quty:item.quty-1}:item)
        }

    }
})

export const {AddItem,RemoveItem,IncrementQuty,DeccrementQuty}=MenuSlice.actions
export default MenuSlice.reducer