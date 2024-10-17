import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs.jsx";
import { useSelector } from "react-redux";
import Description from "./Pokemon/Description.jsx";
import Evolution from "./Pokemon/Evolution.jsx";
import Moves from "./Pokemon/Moves.jsx";

function Pokemon() {
  const { id } = useParams();

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
      setCurrentPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_shiny,
        types: data.types.map((type) => type.type.name),
        stats: data.stats.map((stat) => ({
          base_stat: stat.base_stat,
          name: stat.stat.name,
        })),
        species_url: data.species.url,
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
    fetchPokemonData().finally(() => setLoading(false));
  }, [fetchPokemonData]);

  useEffect(() => {
    if (currentPokemon?.species_url) {
      fetchEvolutionData(currentPokemon.species_url);
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
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    currentPokemon && evolution.length > 0 && (
      <div className="h-[calc(100vh_-_80px)] mt-2 w-[95%] card-clip mx-auto p-[2px] bg-card-border">
        <div className="h-full w-full bg-primary card-clip flex justify-evenly items-center">

    

          {currentTab === 'description' && <Description description={description} evolution={evolution} currentPokemon={currentPokemon}/>}
          {currentTab === 'evolution' && <Evolution/>}
          {currentTab === 'moves' && <Moves/>}

          <Tabs/>

        </div>
      </div>
    )
  );
}

export default Pokemon;
