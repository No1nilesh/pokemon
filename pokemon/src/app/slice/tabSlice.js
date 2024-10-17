import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentTab : 'description'
}

export  const TabSlice = createSlice({
    "name" : "tab",
    initialState :  initialState,
    reducers : {
        setPokemonTab : (state, action)=>{
            state.currentTab = action.payload;
        }
    }
})

export const {setPokemonTab} = TabSlice.actions;