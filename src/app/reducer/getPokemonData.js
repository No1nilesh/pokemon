import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEvolutionOrder } from "../../../utils/findEvolution";

export const getPokemonDataList = createAsyncThunk(
    "pokemon/pokemonList",
    async ({ urls, context }) => {
        try {
            const promises = urls.map((pokemon) =>
                axios.get(pokemon.url).then(({ data }) => ({
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other.home.front_shiny,
                    sound: data.cries.latest,
                    types: data.types.map((type) => type.type.name),
                    stats: data.stats.map((stat) => ({
                        base_stat: stat.base_stat,
                        name: stat.stat.name,
                    })),
                }))
            );
            const pokemonList = await Promise.all(promises);

            return { data: pokemonList, context };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


export const getPokemonData = createAsyncThunk(
    "pokemon/currentPokemon",
    async (id) => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other.home.front_shiny,
                types: data.types.map((type) => type.type.name),
                sound: data.cries.latest,
                stats: data.stats.map((stat) => ({
                    base_stat: stat.base_stat,
                    name: stat.stat.name,
                })),
                species_url: data.species.url,
                abilities: data.abilities.map((ability) => ability.ability.name),
                moves: data.moves.map((move) => move.move.name)
            }
        } catch (error) {
            console.error(error)
        }
    }
)

export const getEvolutionData = createAsyncThunk(
    "pokemon/currentEvolution",
    async (url, { dispatch }) => {
        try {
            const { data } = await axios.get(url);
            const evolution = await axios.get(data?.evolution_chain?.url)
            const chain = getEvolutionOrder(evolution?.data?.chain)
            const evolutionNames = [...new Set(chain.flat())];

            const urls = evolutionNames.map((name) => ({ url: `https://pokeapi.co/api/v2/pokemon/${name}` }));
            dispatch(getPokemonDataList({ urls, context: 'evolution' }));
            return chain
        } catch (error) {
            console.error(error)
        }
    }
)

export const getPokemonType = createAsyncThunk(
    "pokemon/currentPokemonType",
    async (types) => {
        const typeData = { strength: [], weakness: [], vulnerable: [], resistant: [] };
        try {
            await Promise.all(
                types.map(async (type) => {
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                    typeData.strength.push(...data.damage_relations.double_damage_to.map((damage) => damage.name));
                    typeData.weakness.push(...data.damage_relations.half_damage_from.map((damage) => damage.name));
                    typeData.vulnerable.push(...data.damage_relations.double_damage_from.map((damage) => damage.name));
                    typeData.resistant.push(...data.damage_relations.half_damage_to.map((damage) => damage.name));
                })
            )
            return typeData;
        } catch (error) {
            console.error(error)
        }
    }
)