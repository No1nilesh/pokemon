import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonType } from "../../../app/reducer/getPokemonData.js";
import StrengthWeaknessCard from "../components/strenght-weakness-card.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import { colorOnType } from "../../../../utils/utils.js";
import { PokemonType } from "../../../components/TypeIcons.jsx";


function StatsTab() {

  const dispatch = useDispatch()
  const { currentPokemon, fetchedTypeForId, description, loading } = useSelector(state => state.pokemon)

  useEffect(() => {
    if (!currentPokemon?.types?.length) return
    if (fetchedTypeForId === currentPokemon?.id) return
    dispatch(getPokemonType(currentPokemon.types))
  }, [currentPokemon?.types, dispatch, fetchedTypeForId, currentPokemon?.id]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <StrengthWeaknessCard description={description} isLoading={(loading.type || loading.pokemon)} />
      <h3 className="text-xl text-card uppercase font-medium">Pokemon Types</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(colorOnType).map(([type, color]) => {
          return (
            <div key={type} className="flex gap-2">
              <PokemonType type={type} shadow={false} className="w-7" />
              <Badge className={`${color} bg-primary-card`} variant='type'>
                {type}
              </Badge>
            </div>)
        })}
      </div>
    </div>
  )
}

export default StatsTab