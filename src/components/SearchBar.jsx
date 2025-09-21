import { useSelector, useDispatch } from "react-redux";
import { getPokemonDataList } from "../app/reducer/getPokemonData";
import debounce from "../../utils/debounce";
import { useCallback } from "react";

function SearchBar() {
  const { allPokemon } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  const searchPokemon = useCallback((value) => {
    if (value.length) {
      const pokemons = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 18);
      dispatch(getPokemonDataList({ urls: pokemons }));
    } else {
      // Clone and sort Pokémon randomly, ensuring not to mutate the original array
      const clonedPokemons = [...allPokemon];
      const randomPokemons = clonedPokemons
        .sort(() => Math.random() - 0.5)
        .slice(0, 18);
      dispatch(getPokemonDataList({ urls: randomPokemons }));
    }
  }, [allPokemon, dispatch]);

  // Debounce the search to avoid excessive re-renders
  const handleSearch = debounce((value) => searchPokemon(value), 500);

  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      onChange={(e) => handleSearch(e.target.value)}
      className="bg-gray-100/20 px-4 py-2 outline-none w-full text-white rounded-md border-2 transition-colors duration-100 border-transparent focus:border-[#596A95]"
    />
  );
}

export default SearchBar;
