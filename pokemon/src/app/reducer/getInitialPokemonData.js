import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInitialPokemonData = createAsyncThunk(
    "pokemon/initialData",
    async ()=>{
        try {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5000`);
            return data.results;
        } catch (error) {
            console.error(error);
        }
    }

)