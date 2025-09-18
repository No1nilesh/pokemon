import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Description from "./tabs/Description.jsx";
import Evolution from "./tabs/Evolution.jsx";
import Moves from "./tabs/Moves.jsx";
import IsMobile from "../../hooks/IsMobile.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData } from "../../app/reducer/getPokemonData.js";
import { PokemonType } from "../../components/TypeIcons.jsx";

function Pokemon() {
  const { currentPokemon } = useSelector(state => state.pokemon)
  const { id, tab } = useParams();
  const [currentTab, setTab] = useState(0)
  const isMobile = IsMobile();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tabs = useMemo(() => {
    return [
      {
        name: 'Description',
        component: <Description />,
        url: 'description'
      },
      {
        name: 'Evolution',
        component: <Evolution />,
        url: 'evolution'
      },
      {
        name: 'Moves',
        component: <Moves />,
        url: 'moves'
      },
    ]
  }, []);

  useEffect(() => {
    if (!id) return
    dispatch(getPokemonData(id))
  }, [dispatch, id]);

  useEffect(() => {
    const index = tabs.findIndex(t => t.url === tab)
    if (index !== -1) {
      setTab(index)
    } else {
      setTab(0)
    }
  }, [tab, tabs])




  const renderTabButtons = () => {
    return tabs.map((tab, index) =>
      <button
        key={tab.name}
        onClick={() => {
          setTab(index)
          navigate(`/pokemon/${id}/${tab.url}`, { replace: true })
        }}
        className={`text-card hover:bg-primary-card/10 py-3 transition-colors cursor-pointer size-full grid place-content-center bg-primary ${currentTab === index && 'bg-primary-card'}`}>{tab.name}</button>)
  }

  if (isMobile) {
    return (
      <div className="relative flex flex-col min-h-screen">
        {/* Background type icon (stays in the center always) */}
        {currentPokemon?.types?.length > 0 && (
          <PokemonType
            type={currentPokemon.types[0]}
            className="
              fixed 
              top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              opacity-20 
              scale-125 
              pointer-events-none 
              h-80 w-80
            "
          />
        )}

        {/* Foreground content */}
        <div className="relative z-10 flex-1 w-full">
          {tabs[currentTab]?.component}
        </div>

        {/* Bottom nav */}
        <div className="w-full fixed bottom-0 flex h-12 bg-primary-card z-20">
          {renderTabButtons()}
        </div>
      </div>
    )
  }

  return (
    <div className="md:h-[calc(100vh_-_80px)] mt-2 w-[95%] card-clip mx-auto p-[2px] bg-card-border">
      <div className="bg-primary card-clip size-full flex flex-col justify-evenly items-center">
        {currentPokemon?.types?.length > 0 && (
          <PokemonType
            type={currentPokemon.types[0]}
            className="
            absolute
            opacity-20 mt-14
            scale-125
            pointer-events-none
          "
          />
        )}
        <div className="size-full mt-[6.25rem] overflow-y-auto relative z-10">
          {tabs[currentTab]?.component}
        </div>
        <div className="justify-end w-full">
          <div className="w-full h-14 bg-primary-card flex justify-evenly items-center">
            {renderTabButtons()}
          </div>
        </div>
      </div>
    </div>)


}

export default Pokemon;
