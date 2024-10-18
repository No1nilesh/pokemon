import {  useEffect } from "react";
import Loader from "../components/Loader.jsx/index.jsx";
import PokemonList from "../components/PokemonList/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getInitialPokemonData } from "../app/reducer/getInitialPokemonData.js";
import { getPokemonData } from "../app/reducer/getPokemonData.js";
function Home() {
  const { allPokemon, randomPokemon, loading } = useSelector((state) => state.pokemon);

 
  const dispatch = useDispatch();

useEffect(() => {
dispatch(getInitialPokemonData())
}, [dispatch])

useEffect(()=>{
  if(allPokemon){
    const cloneAllPokemon = [...allPokemon];
    const slicedPokemon = cloneAllPokemon.sort(()=>
    Math.random() - 0.5
    ).slice(0, 17);
    dispatch(getPokemonData(slicedPokemon))
  }
},[dispatch, allPokemon])



if(loading){
  return <Loader/>
}

  return <PokemonList pokemonData={randomPokemon} />

}

export default Home;
