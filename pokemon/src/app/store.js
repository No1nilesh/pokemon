import { configureStore } from "@reduxjs/toolkit";
import { PokemonSlice } from "./slice/pokemonSlice";
import { TabSlice } from "./slice/tabSlice";

export const store = configureStore({
    reducer: {
        pokemon : PokemonSlice.reducer,
        tab : TabSlice.reducer
    }
})