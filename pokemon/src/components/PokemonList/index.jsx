/* eslint-disable react/prop-types */
import PokemonCard from "../PokemonCard.jsx";

function PokemonList({ pokemonData }) {
  return (
    <div className="grid grid-cols-1 justify-center gap-y-4 gap-x-4 sm:grid-cols-3  md:w-[85%] mx-auto mt-2">
      {pokemonData.length > 0 ? pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )) : <div className="text-white/15 font-bold text-3xl md:text-7xl w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">No Pokémon Found</div>}
    </div>
  );
}

export default PokemonList;
