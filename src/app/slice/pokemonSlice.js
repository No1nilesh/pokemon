import { createSlice } from "@reduxjs/toolkit"
import { getEvolutionData, getPokemonData, getPokemonDataList, getPokemonType } from "../reducer/getPokemonData"
import { getInitialPokemonData } from "../reducer/getInitialPokemonData"


const initialState = {
    allPokemon: [],
    randomPokemon: [],
    currentPokemon: {},
    evolutionPokemon: [],
    currentEvolutionData: [],
    fetchedEvolutionForId: null,
    fetchedTypeForId: null,
    description: {
        strength: [],
        weakness: [],
        vulnerable: [],
        resistant: [],
    },
    loading: {
        list: false,
        pokemon: false,
        evolution: false,
        type: false
    }
}

export const PokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        resetEvolution(state) {
            state.currentEvolutionData = [];
            state.evolutionPokemon = [];
            state.fetchedEvolutionForId = null
        },
        resetCurrentPokemon(state) {
            state.currentPokemon = {}
            state.fetchedTypeForId = null
            state.description = {
                strength: [],
                weakness: [],
                vulnerable: [],
                resistant: []
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
            state.allPokemon = action.payload
        })

        builder.addCase(getPokemonDataList.pending, (state) => {
            state.loading.list = true
        })
        builder.addCase(getPokemonDataList.fulfilled, (state, action) => {
            const { data, context } = action.payload
            if (context === 'evolution') {
                state.evolutionPokemon = data
            } else {
                state.randomPokemon = data;
            }
            state.loading.list = false
        })


        builder.addCase(getPokemonDataList.rejected, (state) => {
            state.loading.list = false
        })

        builder.addCase(getPokemonData.pending, (state) => {
            state.loading.pokemon = true
        })

        builder.addCase(getPokemonData.fulfilled, (state, action) => {
            state.currentPokemon = action.payload
            state.loading.pokemon = false;
        })

        builder.addCase(getPokemonData.rejected, (state) => {
            state.loading.pokemon = false
        })

        builder.addCase(getEvolutionData.pending, (state) => {
            state.loading.evolution = true
        })

        builder.addCase(getEvolutionData.fulfilled, (state, action) => {
            const { data, updateList } = action.payload
            state.currentEvolutionData = data
            if (updateList) {
                state.fetchedEvolutionForId = state.currentPokemon.id;
            }
            state.loading.evolution = false
        })

        builder.addCase(getEvolutionData.rejected, (state) => {
            state.loading.evolution = false
        })

        builder.addCase(getPokemonType.pending, (state) => {
            state.loading.type = true
        })

        builder.addCase(getPokemonType.fulfilled, (state, action) => {
            state.description = {
                ...state.description,
                ...action.payload
            }
            state.fetchedTypeForId = state.currentPokemon.id;
            state.loading.type = false
        })

        builder.addCase(getPokemonType.rejected, (state) => {
            state.loading.type = false
        })

    }
})


export const { resetEvolution, resetCurrentPokemon } = PokemonSlice.actions;
