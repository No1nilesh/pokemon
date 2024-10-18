import PokeBall from "../../assets/pokeball.svg"
function Loader() {
  return (
  <div className="h-full w-full flex justify-center items-center absolute inset-0 bg-transparent">
  <img className="animate-spin" src={PokeBall} alt="loading..." width={150} height={150} />
  </div>
  )
}

export default Loader