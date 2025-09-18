import { configureStore } from "@reduxjs/toolkit";
import { PokemonSlice } from "./slice/pokemonSlice";

export const store = configureStore({
    reducer: {
        pokemon : PokemonSlice.reducer,
    }
})