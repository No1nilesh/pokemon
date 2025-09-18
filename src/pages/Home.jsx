import { useEffect } from "react";
import PokemonList from "../components/PokemonList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getInitialPokemonData } from "../app/reducer/getInitialPokemonData.js";
import { getPokemonDataList } from "../app/reducer/getPokemonData.js";
function Home() {
  const { allPokemon, randomPokemon } = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialPokemonData())
  }, [dispatch])

  useEffect(() => {
    if (allPokemon?.length > 0) {
      const cloneAllPokemon = [...allPokemon];
      const slicedPokemon = cloneAllPokemon.sort(() =>
        Math.random() - 0.5
      ).slice(0, 17)
      dispatch(getPokemonDataList({ urls: slicedPokemon }))
    }
  }, [allPokemon, dispatch])

  return <PokemonList pokemonData={randomPokemon} />

}

export default Home;
