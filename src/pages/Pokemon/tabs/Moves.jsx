import { useSelector } from "react-redux";
import CustomCard from "../../../components/CustomCard";
import { Skeleton } from "../../../components/ui/skeleton";

function Moves() {
  const { currentPokemon, loading } = useSelector((state) => state.pokemon);
  return (
    <div className="w-full px-4">
      <h1 className="uppercase text-3xl text-card font-semibold mt-6 md:mt-0 text-start md:text-center">abilities</h1>

      <div className="flex gap-2 w-full flex-wrap justify-center mt-2">
        {!loading.pokemon ? currentPokemon?.abilities?.map((data) => {
          return (
            <CustomCard key={data} className={'min-w-48'}>
              <div className="text-card uppercase text-xl font-semibold ">
                {data}
              </div>
            </CustomCard>)
        }) : Array.from({ length: 4 }).map((_, index) => <div key={index} className="min-w-80 h-[3.75rem] bg-gray-800 rounded-sm animate-pulse" />)}
      </div>

      <h1 className="uppercase mt-10 text-3xl text-card font-semibold text-start md:text-center">Moves</h1>
      <div className="flex gap-4 w-full flex-wrap justify-center mb-16 mt-2">
        {!loading.pokemon
          ? currentPokemon?.moves?.map((move) => (
            <CustomCard key={move} className="min-w-fit">
              <div className="text-card uppercase text-xl font-semibold">
                {move}
              </div>
            </CustomCard>
          ))
          : Array.from({ length: 60 }).map((_, index) => {
            const widths = ["w-16", "w-20", "w-24", "w-28", "w-32", "w-36"];
            const randomWidth = widths[Math.floor(Math.random() * widths.length)];
            return (<Skeleton key={index} className={`h-[3.75rem] ${randomWidth} rounded-2xl bg-gray-800`} />);
          })}

      </div>
    </div>

  )
}

export default Moves