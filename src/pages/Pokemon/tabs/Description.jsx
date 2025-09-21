import { useDispatch, useSelector } from "react-redux";
import { findEvolution } from "../../../../utils/findEvolution.js";
import { useEffect, useMemo } from "react";
import { getEvolutionData, getPokemonType } from "../../../app/reducer/getPokemonData.js";
import { PokemonType } from "../../../components/TypeIcons.jsx";
import NameCard from "../components/name-card.jsx";
import Stats from "../components/stats.jsx";
import StrengthWeaknessCard from "../components/strenght-weakness-card.jsx";
import IsMobile from "../../../hooks/IsMobile.jsx";
import ImageBox from "../components/image-box.jsx";

const statInfo = [{
  name: 'Special Atatck',
  shortName: 'sa'
},
{
  name: 'Special Defence',
  shortName: 'sd'
}
]

function Description() {
  const isMobile = IsMobile()
  const dispatch = useDispatch()
  const { currentPokemon, description, currentEvolutionData, fetchedEvolutionForId, fetchedTypeForId, loading } = useSelector(state => state.pokemon)

  useEffect(() => {
    if (!currentPokemon?.types?.length) return
    if (fetchedTypeForId === currentPokemon?.id) return
    dispatch(getPokemonType(currentPokemon.types))
  }, [currentPokemon?.types, dispatch, fetchedTypeForId, currentPokemon?.id]);

  useEffect(() => {
    if (!currentPokemon?.species_url) return;
    if (fetchedEvolutionForId === currentPokemon?.id) return
    dispatch(getEvolutionData({ url: currentPokemon.species_url, updateList: false }));
  }, [dispatch, currentPokemon?.species_url, fetchedEvolutionForId, currentPokemon?.id]);

  const evolutionCount = useMemo(() => {
    if (!currentPokemon?.name || !Array.isArray(currentEvolutionData)) return -1;
    return findEvolution(currentEvolutionData, currentPokemon.name);
  }, [currentEvolutionData, currentPokemon?.name]);


  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center">
        <NameCard
          currentPokemon={currentPokemon}
          isLoading={!loading.pokemon}
          evolutionCount={evolutionCount >= 0 ? evolutionCount : null} />
        <Stats currentPokemon={currentPokemon} isLoading={!loading.pokemon} />
        <div>
          {statInfo.map(s => (
            <div key={s.name} className="flex gap-2">
              <div className="uppercase text-xs text-center text-indigo-600">{s.shortName}</div>
              <div className="uppercase text-xs text-center text-card">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center size-full mb-16 md:mb-0 ">

      <div className="flex-1 size-full flex flex-col justify-around md:items-center items-start mt-6 md:mt-0">
        <NameCard
          currentPokemon={currentPokemon}
          isLoading={!loading.pokemon}
          evolutionCount={evolutionCount >= 0 ? evolutionCount : null} />
        <Stats currentPokemon={currentPokemon} isLoading={!loading.pokemon} />
      </div>


      <div className="flex-1 w-full flex flex-col items-center mb-4 md:mb-0">
        <ImageBox currentPokemon={currentPokemon} isLoading={!loading.pokemon} />
      </div>


      <div className="flex-1 size-full flex flex-col items-center justify-around">
        {!loading?.type &&
          (<div className="hidden md:flex gap-4 size-14">
            {currentPokemon?.types?.map((type, i) => <PokemonType key={i} type={type} />)}
          </div>)}
        <StrengthWeaknessCard description={description} isLoading={(loading.type || loading.pokemon)} />
      </div>

    </div>
  )
}

export default Description