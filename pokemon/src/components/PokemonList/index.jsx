/* eslint-disable react/prop-types */
import PokemonCard from "../PokemonCard.jsx";

function PokemonList({ pokemonData }) {
  console.log(pokemonData)
  return (
    <div className="grid grid-cols-1 justify-center gap-y-4 gap-x-4 sm:grid-cols-3  md:w-[85%] mx-auto mt-2">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
