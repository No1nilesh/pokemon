function Loader() {
  return (
    <div className="h-10 w-10 bg-gray-100 rounded-full border-2 border-black flex items-center justify-center relative animate-spin mx-auto">
       <div className="h-1/2 w-full bg-red-600 
            rounded-tl-full rounded-tr-full absolute top-0"></div>
            <div className="z-50 h-[2px] w-full bg-black"></div>
            <div className="size-2 rounded-full bg-white z-50 absolute border-black border-2"></div>
    </div>
  )
}

export default Loader