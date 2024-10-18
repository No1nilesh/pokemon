/* eslint-disable react/prop-types */

function Moves({ currentPokemon }) {
  return (
    <div className="w-full px-4 h-full overflow-y-auto">

      <h1 className="uppercase mt-20 text-3xl text-card font-semibold">abilities</h1>

      <div className="flex gap-2 w-full flex-wrap justify-center mt-2">
        {
          currentPokemon.abilities.map((data) => {
            return <div key={data} className=" rounded-sm bg-primary-card/60 h-fit w-48 px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-16 before:bg-card-border before:absolute before:top-0 before:left-0">
              <div className="text-card uppercase text-xl font-semibold ">
                <span>{data}</span>
              </div>
            </div>
          })
        }
      </div>

      <h1 className="uppercase mt-10 text-3xl text-card font-semibold">Moves</h1>      
      <div className="flex gap-4 w-full flex-wrap justify-center mb-16 mt-2">
        {
          currentPokemon.moves.map((move) => {
            return <div key={move} className=" rounded-sm bg-primary-card/60 h-fit w-fit px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-16 before:bg-card-border before:absolute before:top-0 before:left-0">
              <div className="text-card uppercase text-xl font-semibold ">
                <span>{move}</span>
              </div>
            </div>
          })
        }
      </div>

    

    </div>

  )
}

export default Moves