/* eslint-disable react/prop-types */
import AudioPlayer from "../AudioPlayer.jsx";
import PokeBall from "../../assets/ball.svg";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function PokemonCard({ pokemon }) {

  const colorOnType = (type) => {
    switch (type) {
      case "grass":
        return "bg-green-600 text-green-300";
      case "fire":
        return "bg-red-800 text-red-300";
      case "bug":
        return "bg-green-700 text-green-300";
      case "water":
        return "bg-blue-600 text-blue-300";
      case "poison":
        return "bg-purple-900 text-purple-300";
      case "electric":
        return "bg-yellow-400 text-brown-200";
      case "ground":
        return "bg-brown-800 text-brown-200";
      case "fairy":
        return "bg-pink-300 text-pink-800";
      case "rock":
        return "bg-gray-500 text-pink-200";
      default:
        return "bg-blue-100";
    }
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="card-clip p-[2px] cursor-pointer bg-card-border">
        <div className="relative p-1 bg-primary-card ">
          <img
            src={pokemon.image ? pokemon.image : PokeBall}
            alt={pokemon.name}
            className="h-40 aspect-square m-auto "
          />
          <span className="text-xl font-bold capitalize text-card text-pretty opacity-80">
            {pokemon.name}
          </span>
          {/* <AudioPlayer sound={pokemon.sound}/> */}

          <div className="absolute right-2 top-2">
            {
              pokemon.types.length > 0 && pokemon.types.map((type, index) => {
                return <span key={index} className={`${colorOnType(type)}  bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded float-right`}>{
                  type
                }</span>
              })
            }
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
