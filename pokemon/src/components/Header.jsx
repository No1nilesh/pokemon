import { useState, useRef } from "react";
import SearchBar from "./SearchBar.jsx";
import { ChevronLeft, Menu, X } from "lucide-react";
import IsMobile from "../hooks/IsMobile.jsx";
import PokeBall from "../assets/pokeball.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCurrentPokemon, resetEvolution } from "../app/slice/pokemonSlice.js";
import { useDispatch } from "react-redux";
function Header() {
  const isMobile = IsMobile();
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation()
  const isHomePage = location.pathname === '/'; // Check if the user is on the home page  

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
    if (menuRef.current) {
      const height = isMenuOpen ? "0px" : `${menuRef.current.scrollHeight}px`;
      menuRef.current.style.maxHeight = height;
    }
  };

  const dispatch = useDispatch()
  const hBack = () => {
    navigate(-1)
    dispatch(resetCurrentPokemon())
    dispatch(resetEvolution())
  }

  return (
    <div className="header p-[1px] sticky top-0 z-50 rounded-md ">
      <header className="flex gap-2 flex-col bg-primary rounded-md ">
        <nav className="flex justify-center items-center z-50 relative">
          <img
            src={PokeBall}
            alt="pokeball"
            width={40}
            height={40}
            className="drop-shadow-md mx-1"
          />
          <h1 className="text-4xl text-gray-100 font-bold py-3"> Pokémon</h1>

          {/* SearchBar only visible on homepage */}
          {isHomePage && !isMobile && (
            <div className="absolute right-8">
              <SearchBar />
            </div>
          )}

          {/* Mobile menu toggle */}

          {isHomePage && <div onClick={handleClick} className="text-white absolute right-4 cursor-pointer md:hidden">
            {!isMenuOpen ? <Menu /> : <X />}
          </div>}
          {!isHomePage && <button
            onClick={hBack}
            className="bg-primary-card rounded-sm drop-shadow-md text-card flex pr-4 py-1 absolute right-5 cursor-pointer">
            <ChevronLeft size={24} /> Back
          </button>}
        </nav>

        {/* Mobile SearchBar only on homepage */}
        {isMobile && isHomePage && (
          <ul
            ref={menuRef}
            className={`overflow-hidden bg-inherit text-white transition-all duration-300 ease-in-out z-40 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <li className="bg-inherit w-full py-2">
              <SearchBar />
            </li>
          </ul>
        )}

      </header>
    </div>
  );
}

export default Header;
