import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Description from "./tabs/Description.jsx";
import Evolution from "./tabs/Evolution.jsx";
import Moves from "./tabs/Moves.jsx";
import IsMobile from "../../hooks/IsMobile.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonData } from "../../app/reducer/getPokemonData.js";
import { PokemonType } from "../../components/TypeIcons.jsx";
import { CustomDrawer } from "../../components/CustomDrawer.jsx";
import ImageBox from "./components/image-box.jsx";
import { DescriptionIcon, EvolutionIcon, MovesIcon } from "../../assets/Icons.jsx";
import StatsTab from "./tabs/StatsTab.jsx";
import { Skeleton } from "../../components/ui/skeleton.jsx";
import { AnimatePresence, motion } from "framer-motion";

function Pokemon() {
  const { id, tab } = useParams();
  const isMobile = IsMobile();
  const [currentTab, setTab] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { currentPokemon, loading } = useSelector(state => state.pokemon)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tabs = useMemo(() => {
    const tabsData = [
      {
        name: 'Description',
        component: <Description />,
        url: 'description',
        icon: <DescriptionIcon />
      },
      {
        name: 'Evolution',
        component: <Evolution handleDrawer={setDrawerOpen} />,
        url: 'evolution',
        icon: <EvolutionIcon />
      }
    ]

    if (isMobile) {
      tabsData.push({
        name: 'Stats',
        component: <StatsTab />,
        url: 'stats',
        icon: <MovesIcon />
      })
    }

    if (!isMobile) {
      tabsData.push({
        name: 'Moves',
        component: <Moves />,
        url: 'moves',
        icon: <MovesIcon />
      })
    }

    return tabsData
  }, [isMobile]);

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
    return tabs.map((tab, index) => {
      const isActive = currentTab === index;

      return (
        <button
          key={tab.name}
          onClick={() => {
            setDrawerOpen(true);
            setTab(index);
            navigate(`/pokemon/${id}/${tab.url}`, { replace: true });
          }}
          className={`
            flex-1
            py-4
            flex items-center justify-center flex-col gap-2
            h-full
            text-sm font-medium
            relative
            transition-colors
            
          ${isMobile
              ? (`${isActive
                ? 'text-card font-semibold relative'
                : 'text-muted hover:text-card relative'}`)
              : (isActive
                ? "bg-primary-card text-card shadow-inner rounded-tl-md rounded-tr-md"
                : "text-muted hover:text-card")
            }`
          }

        >
          {tab.icon}

          {/* underline indicator */}
          {isActive && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 rounded-full bg-card-border" />
          )}
        </button>
      );
    });
  };


  if (isMobile) {
    return (
      <div className="relative flex-1 flex flex-col h-full justify-center items-center">
        {currentPokemon?.types?.length > 0 && (
          <PokemonType
            type={currentPokemon.types[0]}
            className="
              fixed 
              top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              opacity-30 
              scale-125 
              pointer-events-none 
              h-80 w-80
            "
          />
        )}
        <div className="flex flex-col items-center">
          {!loading.pokemon ? <motion.div
            key={currentPokemon.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-card uppercase text-3xl font-semibold"
          >
            {currentPokemon.name}
          </motion.div> : <Skeleton className='h-9 w-60' />}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <ImageBox currentPokemon={currentPokemon} isLoading={!loading.pokemon} />
          </motion.div>
        </div>
        {/* Foreground content */}
        <CustomDrawer open={drawerOpen} onOpenChange={setDrawerOpen} title={tabs[currentTab]?.name}>
          {tabs[currentTab]?.component}
        </CustomDrawer>

        {/* Bottom nav */}
        <div className="w-full fixed bottom-0 flex h-14 z-20 bg-primary-card drop-shadow-xl rounded-tl-3xl rounded-tr-3xl overflow-x-hidden">
          {renderTabButtons()}
        </div>
      </div>
    )
  }

  return (
    <div className="hidden lg:block md:h-[calc(100vh_-_80px)] mt-2 w-[95%] card-clip mx-auto p-[2px] bg-card-border">
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="size-full mt-[6.25rem] overflow-y-auto relative z-10"
          >
            {tabs[currentTab]?.component}
          </motion.div>
        </AnimatePresence>
        <div className="w-full flex justify-evenly items-center">
          {renderTabButtons()}
        </div>
      </div>
    </div>)


}

export default Pokemon;
