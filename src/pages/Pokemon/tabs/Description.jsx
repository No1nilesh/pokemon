import { useDispatch, useSelector } from "react-redux";
import { findEvolution } from "../../../../utils/findEvolution.js";
import AudioPlayer from "../../../components/AudioPlayer.jsx";
import { useEffect } from "react";
import { getEvolutionData, getPokemonType } from "../../../app/reducer/getPokemonData.js";
import CustomCard from "../../../components/CustomCard.jsx";
import { PokemonType } from "../../../components/TypeIcons.jsx";

function Description() {

  const { currentPokemon, description, currentEvolutionData, fetchedEvolutionForId, fetchedTypeForId, loading } = useSelector(state => state.pokemon)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentPokemon?.types?.length) return
    if (fetchedTypeForId === currentPokemon?.id) return
    dispatch(getPokemonType(currentPokemon.types))
  }, [currentPokemon?.types, dispatch, fetchedTypeForId, currentPokemon?.id]);

  useEffect(() => {
    if (!currentPokemon?.species_url) return;
    if (fetchedEvolutionForId === currentPokemon?.id) return
    dispatch(getEvolutionData(currentPokemon.species_url));
  }, [dispatch, currentPokemon?.species_url, fetchedEvolutionForId, currentPokemon?.id]);


  return (
    <div className="flex flex-col md:flex-row justify-center items-center size-full mb-16 md:mb-0 ">
      {/* Left Section */}
      <div className="flex-1 size-full flex flex-col justify-around md:items-center items-start mt-6 md:mt-0">
        <CustomCard className="w-3/4 md:w-auto">
          {!loading.pokemon ?
            <>
              <div className="text-card uppercase text-3xl font-semibold ">
                {currentPokemon.name}
              </div>

              <div className="flex gap-2 uppercase">
                <span className="text-indigo-600">Type</span>

                <span className="text-card">{currentPokemon?.types?.join(', ')}</span>
              </div>

              <div className="flex gap-2 uppercase">
                <span className="text-red-500">Evolution</span>
                {!loading.evolution ?
                  <span className="text-card">{findEvolution(currentEvolutionData, currentPokemon.name)}</span> :
                  <div className=" w-full bg-gray-800 animate-pulse rounded-sm"></div>}
              </div>
            </> : <div className=" w-full h-28 bg-gray-800 animate-pulse rounded-sm"></div>}
        </CustomCard>

        {/* Stats */}
        <div className="flex p-4 rounded-sm items-end gap-2">
          {!loading.pokemon ? currentPokemon?.stats?.map((stat) => (
            <div className="text-card flex flex-col gap-2" key={stat.name}>
              <div className="stat-bar flex flex-col-reverse justify-center items-center gap-1">
                {Array.from({ length: Math.floor(stat.base_stat / 10) }).map((_, index) => (
                  <div key={index} className="bg-card-border w-10 h-2 opacity-80"></div>
                ))}
                <span>{stat.base_stat}</span>
              </div>
              <div className="uppercase text-xs">{stat.name}</div>
            </div>
          )) :
            <div className="flex gap-4 w-full items-end">
              {Array.from({ length: 6 }).map((_, index) => {
                const height = Math.floor(Math.random() * 150) + 50; // between 20px and 120px
                return (
                  <div
                    key={index}
                    style={{ height: `${height}px` }}
                    className=" w-12 bg-gray-800 animate-pulse rounded-sm"
                  ></div>
                );
              })}
            </div>
          }
        </div>
      </div>

      {/* Image Section */}
      {!loading.pokemon ?
        <div className="flex-1 w-full md:w-[50%] flex flex-col items-center mb-4 md:mb-0">
          <img src={currentPokemon.image} alt={`${currentPokemon.name} sprite`} className="w-full h-auto object-contain drop-shadow-2xl" />
          <AudioPlayer sound={currentPokemon.sound} autoPlay={true} />
        </div> :
        <div className="flex-1 w-full aspect-square bg-gray-800 animate-pulse rounded-full"></div>}

      {/* Strength/Weakness Section */}
      <div className="stats-container flex-1 md:mt-64 grid place-content-center ">
        <CustomCard>
          {!(loading.type || loading.pokemon) ? <div className="flex flex-col gap-1">
            {Object.keys(description).map((title, index) => (
              <div className="" key={index}>
                <span className="text-card uppercase">{title} : </span>
                <span className="uppercase text-indigo-600 ml-2 text-sm text-pretty ">{description[title].join(' , ') + '.'}</span>
              </div>
            ))}
          </div> : <div className="w-96 h-36 bg-gray-800 animate-pulse rounded-sm"></div>}
        </CustomCard>
      </div>

      {!loading?.type && <div className="hidden md:block size-14 absolute top-8 right-20">
        {currentPokemon?.types
          ?.filter((t, index) => index !== 0)
          .map((type, i) => (
            <PokemonType key={i} type={type} />
          ))
        }
      </div>}
    </div>
  )
}

export default Description