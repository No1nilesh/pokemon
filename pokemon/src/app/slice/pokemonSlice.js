import { createSlice } from "@reduxjs/toolkit"
import { getPokemonData } from "../reducer/getPokemonData"
import { getInitialPokemonData } from "../reducer/getInitialPokemonData"


const initialState = {
allPokemon : undefined,
randomPokemon : [],
loading : false
}

export const PokemonSlice = createSlice({
    name : "pokemon",
    initialState,
    reducers : {
    },

    extraReducers : (builder)=>{
        builder.addCase(getInitialPokemonData.fulfilled, (state, action)=>{
            state.allPokemon = action.payload
        })

        builder.addCase(getPokemonData.fulfilled, (state, action)=>{
            state.randomPokemon = action.payload;
            state.loading = false
        })

        builder.addCase(getPokemonData.pending, (state)=>{
            state.loading = true
        })
    }
})

