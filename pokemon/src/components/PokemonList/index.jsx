import PokemonCard from "../PokemonCard.jsx";

function PokemonList({ pokemonData }) {
  return (
   
      <div className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 md:grid-cols-4">
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
   
  );
}

export default PokemonList;
