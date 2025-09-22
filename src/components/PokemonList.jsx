import PropTypes from 'prop-types'
import PokemonCard from "./PokemonCard.jsx";
import { useSelector } from 'react-redux';
import { Skeleton } from './ui/skeleton.jsx';

function PokemonList({ pokemonData }) {

  const { loading } = useSelector((state) => state.pokemon);

  return (
    <div className="grid grid-cols-1 justify-center gap-4 w-full md:grid-cols-2 xl:grid-cols-3  md:w-[85%] mx-auto mt-2">
      {loading.list ? Array.from({ length: 18 }).map((_, index) => (
        <Skeleton key={index} className={'card-clip w-full h-[14.75rem] md:h-64 bg-gray-800'} />
      )) : pokemonData?.length > 0 ? pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )) : <div className="text-white/15 font-bold text-3xl md:text-7xl w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">No Pokémon Found</div>}
    </div>
  );
}

export default PokemonList;

PokemonList.propTypes = {
  pokemonData: PropTypes.array
}