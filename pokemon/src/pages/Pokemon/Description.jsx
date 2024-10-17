/* eslint-disable react/prop-types */
function Description({description, evolution, currentPokemon}) {

    const findEvolution = (evolution, name) => {
        for (const form of evolution) {
          const index = form.indexOf(name);
          if (index >= 0) return index + 1;
        }
      };
    
  return (
    <>
              {/* Left Section */}
              <div className="flex-1 h-full flex flex-col justify-around items-center">
            <div className="mt-10 rounded-sm bg-primary-card/60 h-fit w-80 px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-40 before:bg-card-border before:absolute before:top-0 before:left-0">
              <div className="text-card uppercase text-3xl font-semibold ">
                <span>{currentPokemon.name}</span>
              </div>
              <div className="flex gap-2 uppercase">
                <span className="text-indigo-600">Type</span>
                <span className="text-card">{currentPokemon.types.join(', ')}</span>
              </div>
              <div className="flex gap-2 uppercase">
                <span className="text-red-500">Evolution</span>
                <span className="text-card">{findEvolution(evolution, currentPokemon.name)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex p-4 rounded-sm items-end gap-2">
              {currentPokemon.stats.map((stat) => (
                <div className="text-card flex flex-col gap-2" key={stat.name}>
                  <div className="stat-bar flex flex-col-reverse justify-center items-center gap-1">
                    {Array.from({ length: Math.floor(stat.base_stat / 10) }).map((_, index) => (
                      <div key={index} className="bg-card-border w-10 h-2 opacity-80"></div>
                    ))}
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="uppercase text-xs">{stat.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="image-container flex-1">
            <img src={currentPokemon.image} alt={`${currentPokemon.name} sprite`} />
          </div>

          {/* Strength/Weakness Section */}
          <div className="stats-container flex-1 mt-64 grid place-content-center ">
            <div className="rounded-sm bg-primary-card/60 flex gap-2 h-fit w-96 px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-40 before:bg-card-border before:absolute before:top-0 before:left-0">
              <div className="flex flex-col">
                {Object.keys(description).map((title, index) => (
                  <span className="text-card uppercase" key={index}>{title}</span>
                ))}
              </div>
              <div className="flex flex-col justify-around text-indigo-600">
                {Object.values(description).map((desc, index) => (
                  <span className="uppercase text-sm" key={index}>{desc.join(", ")}</span>
                ))}
              </div>
            </div>
          </div>
    </>
  )
}

export default Description