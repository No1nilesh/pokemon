import PokeBall from "../assets/ball.svg";
import { Link } from "react-router-dom";
import { PokemonType } from "./TypeIcons";
import PropTypes from 'prop-types'
function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.id}/description`}>
      <div className="card-clip p-[2px] cursor-pointer bg-card-border">
        <div className="relative py-6 bg-primary-card ">
          <div className=" text-base md:text-lg font-bold uppercase text-card text-pretty text-left ml-2 md:ml-8">
            {pokemon.name}
          </div>
          <span className="flex gap-2 absolute right-8 top-6">
            {pokemon?.types?.length > 0 &&
              pokemon.types.map((type) => (
                <PokemonType
                  key={type}
                  type={type}
                  className="size-7 flex justify-center items-center"
                />
              ))}
          </span>
          <img
            src={pokemon.image ? pokemon.image : PokeBall}
            alt={pokemon.name}
            className=" h-40 md:h-48 aspect-square m-auto"
          />
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired
}