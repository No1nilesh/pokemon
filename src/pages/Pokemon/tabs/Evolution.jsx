import { useDispatch, useSelector } from "react-redux"
import { findEvolution } from "../../../../utils/findEvolution.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvolutionData } from "../../../app/reducer/getPokemonData.js";
import CustomCard from "../../../components/CustomCard.jsx";
import AudioPlayer from "../../../components/AudioPlayer.jsx";
import { Skeleton } from "../../../components/ui/skeleton.jsx";
import { Carousel, CarouselContent, CarouselItem } from "../../../components/ui/carousel.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button.jsx";
import IsMobile from "../../../hooks/IsMobile.jsx";
import { PokemonType } from "../../../components/TypeIcons.jsx";

function Evolution({ handleDrawer }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isMobile = IsMobile()
  const { currentEvolutionData, fetchedEvolutionForId, currentPokemon, evolutionPokemon, loading } = useSelector((state) => state.pokemon);
  const [api, setApi] = useState(null)

  useEffect(() => {
    if (!currentPokemon?.species_url) return;
    if (fetchedEvolutionForId === currentPokemon?.id) return
    dispatch(getEvolutionData({ url: currentPokemon.species_url, updateList: true }));
  }, [dispatch, currentPokemon?.species_url, currentPokemon?.id, fetchedEvolutionForId]);

  return (
    <div className="flex flex-col justify-around items-center size-full gap-8 md:gap-0">

      <div className="text-card uppercase text-3xl font-semibold hidden xl:block">
        Evolution
      </div>


      <Carousel setApi={setApi} onInit={(api) => setApi(api)} className="w-full max-w-2xl lg:max-w-7xl relative">
        <CarouselContent className={`-ml-4 px-6 gap-2 ${evolutionPokemon?.length <= 3 && !isMobile ? "justify-center" : ""}`}>
          {(loading.list || loading.evolution) ?
            Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 basis-full xl:basis-1/3">
                <Skeleton className="w-full h-[20rem] md:h-[28.65rem] rounded-2xl bg-gray-800" />
              </CarouselItem>
            ))
            : evolutionPokemon?.map((pokemon) => (
              <CarouselItem
                onClick={() => {
                  navigate(`/pokemon/${pokemon.id}/description`, { replace: true })
                  handleDrawer(false)
                }
                }
                className="pl-1 basis-full lg:basis-1/3"
                key={pokemon.id}
              >
                <CustomCard className="relative ">
                  <div className="text-card uppercase text-xl font-semibold w-full flex items-center justify-between">
                    <span>{pokemon.name}</span>
                    <AudioPlayer sound={pokemon.sound} />
                  </div>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full aspect-square"
                  />
                  <div className="flex justify-between items-end">
                    <span className="flex gap-2">
                      {currentPokemon?.types?.map(type => <PokemonType key={type} type={type} className="w-8" />)}
                    </span>
                    <span className="text-sm space-x-1">
                      <span className="text-red-500">Evolution</span>
                      <span className="text-card">
                        {findEvolution(currentEvolutionData, pokemon.name)}
                      </span>
                    </span>
                  </div>
                </CustomCard>
              </CarouselItem>
            ))}
        </CarouselContent>
        {evolutionPokemon?.length > 3 && !isMobile && !(loading.list || loading.evolution) && (
          <>
            <Button
              onClick={() => api?.scrollPrev()}
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 z-10 rounded-full hover:bg-primary/90 hover:text-card"
            >
              <ChevronLeft size={64} />
            </Button>

            <Button
              onClick={() => api?.scrollNext()}
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 z-10 rounded-full hover:bg-primary/90 hover:text-card"
            >
              <ChevronRight size={64} />
            </Button>

          </>)}
      </Carousel>
    </div>
  );
}

export default Evolution;
