import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPokemonData = createAsyncThunk(
    "pokemon/pokemonList", async (pokemons)=>{
try {
    const pokemonList = [];
    for (const pokemon of pokemons) {
        const {data} = await axios.get(pokemon.url);
        pokemonList.push({id : data.id , name : data.name, image : data.sprites.other.home.front_shiny, sound : data.cries.latest,  types: data.types.map((type)=>(
            type.type.name
         )), stats: data.stats.map((stat) => ({
            base_stat: stat.base_stat,
            name: stat.stat.name,
          })),  })
    }
    return pokemonList;
} catch (error) {
    console.error(error)
}
    })
