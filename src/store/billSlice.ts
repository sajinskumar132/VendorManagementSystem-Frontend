import { createSlice } from "@reduxjs/toolkit";

export const BillSlice=createSlice({
    name:"bill",
    initialState:{
        bills:[],
        UpdateState:false
    },
    reducers:{
        UpdateBills:(state,actions)=>{
            state.bills=actions.payload
        },
        UpdateStates:(state)=>{
            state.UpdateState=!state.UpdateState
        }
    }
})

export const { UpdateBills,UpdateStates} = BillSlice.actions
export default BillSlice.reducer