import PropTypes from 'prop-types'
import PokemonCard from "./PokemonCard.jsx";
import { useSelector } from 'react-redux';

function PokemonList({ pokemonData }) {

  const { loading } = useSelector((state) => state.pokemon);

  return (
    <div className="grid grid-cols-1 justify-center gap-y-4 gap-x-4 sm:grid-cols-3  md:w-[85%] mx-auto mt-2">
      {!loading.list ? pokemonData?.length > 0 ? pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )) : <div className="text-white/15 font-bold text-3xl md:text-7xl w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">No Pokémon Found</div> :
        Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className="card-clip w-full md:w-[33rem] h-[14.75rem] md:h-64 animate-pulse bg-gray-800 rounded-sm"
          ></div>
        ))
      }
    </div>
  );
}

export default PokemonList;

PokemonList.propTypes = {
  pokemonData: PropTypes.array
}