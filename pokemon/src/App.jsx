import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar.jsx";
import "./App.css"

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const results = response.data.results;
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return { name: pokemon.name, image: details.data.sprites.front_default };
          })
        );
        setPokemonData(pokemonDetails);
        setFilteredData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, pokemonData]);

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-8">Pokémon Search</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PokemonList pokemonData={filteredData} />
    </div>
  );
}

export default App;
