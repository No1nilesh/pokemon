import PokeBall from "../assets/ball.svg"

function index() {
  return (
    <div className="text-card h-[calc(100vh_-_80px)] w-full grid place-content-center relative">
    <h2 className="text-4xl font-semibold">Page Not Found</h2>
    <img src={PokeBall} alt="Not found" width={400} height={400} className="opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
    </div>
  )
}

export default index