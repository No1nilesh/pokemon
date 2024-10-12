import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="rounded-lg border border-black   p-4 shadow-md transition-shadow hover:shadow-xl hover:bg-gray-200">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-32 w-32 mx-auto "
      />
      <h2 className="mt-4 text-xl font-bold capitalize text-red-600">
        {pokemon.name}
      </h2>
    </div>
  );
}

export default PokemonCard;
