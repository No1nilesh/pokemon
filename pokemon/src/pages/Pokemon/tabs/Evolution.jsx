import { useDispatch, useSelector } from "react-redux"
import { findEvolution } from "../../../../utils/findEvolution.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getEvolutionData } from "../../../app/reducer/getPokemonData.js";
import CustomCard from "../../../components/CustomCard.jsx";
import AudioPlayer from "../../../components/AudioPlayer.jsx";

function Evolution() {
  const { currentEvolutionData, fetchedEvolutionForId, currentPokemon, evolutionPokemon, loading } = useSelector((state) => state.pokemon);
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentPokemon?.species_url) return;
    if (fetchedEvolutionForId === currentPokemon?.id) return
    dispatch(getEvolutionData(currentPokemon.species_url));
  }, [dispatch, currentPokemon?.species_url, fetchedEvolutionForId, currentPokemon?.id]);

  return (
    <div className="flex flex-col justify-center items-start md:items-center size-full">

      <div className="text-card uppercase text-3xl font-semibold mt-6 md:mt-0 ml-4">
        Evolution
      </div>

      <div className="mt-4 flex flex-col gap-4 md:flex-row w-full justify-evenly items-center flex-1 mb-20 md:mb-0 overflow-x-auto px-4">
        {!(loading.list || loading.evolution) ? (
          evolutionPokemon?.map((pokemon) => {
            return (
              <div
                onClick={() =>
                  navigate(`/pokemon/${pokemon.id}/description`, { replace: true })
                }
                className="cursor-pointer w-full md:w-fit"
                key={pokemon.id}
              >
                <CustomCard className={'relative'}>
                  <div className="text-card uppercase text-xl font-semibold w-full flex items-center justify-between">
                    <span>{pokemon.name}</span>
                    <AudioPlayer sound={pokemon.sound} />
                  </div>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className=" w-full md:w-96 aspect-square"
                  />
                  <span className=" text-sm absolute right-2 bottom-2 space-x-1">
                    <span className="text-red-500">Evolution</span>
                    <span className="text-card">
                      {findEvolution(currentEvolutionData, pokemon.name)}
                    </span>
                  </span>
                </CustomCard>
              </div>
            );
          })
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full md:w-80 h-[27.25rem] animate-pulse bg-gray-800 rounded-sm"
            ></div>
          ))
        )}
      </div>

    </div>
  );
}

export default Evolution;
