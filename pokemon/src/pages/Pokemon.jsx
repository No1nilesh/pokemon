import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs.jsx";
import { useSelector } from "react-redux";
import Description from "./Pokemon/Description.jsx";
import Evolution from "./Pokemon/Evolution.jsx";
import Moves from "./Pokemon/Moves.jsx";
import Loader from "../components/Loader.jsx/index.jsx";
import IsMobile from "../hooks/IsMobile.jsx"

function Pokemon() {
  const { id } = useParams();
  const isMobile = IsMobile();
    const [currentPokemon, setCurrentPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [description, setDescription] = useState({
    strength: [],
    weakness: [],
    vulnerable: [],
    resistant: [],
  });
  const [loading, setLoading] = useState(true);
  const {currentTab} = useSelector((state)=> state.tab);

  // Fetch Pokemon Data
  const fetchPokemonData = useCallback(async () => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log("data", data)
      setCurrentPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_shiny,
        types: data.types.map((type) => type.type.name),
        sound : data.cries.latest,
        stats: data.stats.map((stat) => ({
          base_stat: stat.base_stat,
          name: stat.stat.name,
        })),
        species_url: data.species.url,
        abilities : data.abilities.map((ability)=> ability.ability.name),
        moves : data.moves.map((move)=> move.move.name)
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }, [id]);

  // Fetch Evolution Chain
  const fetchEvolutionData = useCallback(async (speciesUrl) => {
    if (!speciesUrl) return;
    try {
      const { data } = await axios.get(speciesUrl);
      const evolutionChain = await axios.get(data.evolution_chain.url);
      setEvolution(getEvolutionOrder(evolutionChain.data.chain));
    } catch (error) {
      console.error("Error fetching evolution data:", error);
    }
  }, []);

  // Fetch Type Data (Strength, Weakness, etc.)
  const fetchTypesData = useCallback(async (types) => {
    const typeData = { strength: [], weakness: [], vulnerable: [], resistant: [] };

    try {
      await Promise.all(
        types.map(async (type) => {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
          typeData.strength.push(...data.damage_relations.double_damage_to.map((damage) => damage.name));
          typeData.weakness.push(...data.damage_relations.half_damage_from.map((damage) => damage.name));
          typeData.vulnerable.push(...data.damage_relations.double_damage_from.map((damage) => damage.name));
          typeData.resistant.push(...data.damage_relations.half_damage_to.map((damage) => damage.name));
        })
      );
      setDescription(typeData);
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPokemonData()
  }, [fetchPokemonData]);

  useEffect(() => {
    if (currentPokemon?.species_url) {
      fetchEvolutionData(currentPokemon.species_url).finally(setLoading(false))
    }
  }, [currentPokemon, fetchEvolutionData]);

  useEffect(() => {
    if (currentPokemon?.types?.length > 0) {
      fetchTypesData(currentPokemon.types);
    }
  }, [currentPokemon, fetchTypesData]);

  const getEvolutionOrder = (chain) => {
    const path = [];
    const traverse = (chain, currentPath) => {
      currentPath.push(chain.species.name);
      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution) => traverse(evolution, [...currentPath]));
      } else {
        path.push(currentPath);
      }
    };
    traverse(chain, []);
    return path;
  };


  if (loading) {
    return <Loader/>; // Loading indicator
  }

  const handleTabs = () => {
    switch (currentTab) {
      case 'evolution':
        return <Evolution evolution={evolution} />;
      case 'moves':
        return <Moves currentPokemon={currentPokemon}/>;
      default:
        return <Description description={description} evolution={evolution} currentPokemon={currentPokemon} />;
    }
  }
  
  if(isMobile){
   return currentPokemon && evolution.length > 0  ? <div className="flex flex-col">
    {handleTabs()}
    <div className="w-full fixed bottom-0"><Tabs/></div>
   </div> : <Loader/>
  }
   
  return currentPokemon && evolution.length > 0  ?
    <div className="md:h-[calc(100vh_-_80px)] mt-2 w-[95%] card-clip mx-auto p-[2px] bg-card-border">
      <div className="bg-primary card-clip size-full flex flex-col justify-evenly items-center">
      <div className="size-full mt-[6.25rem] overflow-y-auto">
      { handleTabs()}
      </div>
      <div className="justify-end w-full">
        <Tabs/>
      </div>
      </div>
    </div> : <Loader/>
    
  
}

export default Pokemon;
