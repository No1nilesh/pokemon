import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import { ChevronLeft, Menu, X } from "lucide-react";
import IsMobile from "../hooks/IsMobile.jsx";
import PokeBall from "../assets/pokeball.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCurrentPokemon, resetEvolution } from "../app/slice/pokemonSlice.js";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button.jsx";
import CustomTooltip from "./CustomTooltip.jsx";

function Header() {
  const isMobile = IsMobile();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const isHomePage = location.pathname === "/"; // check if homepage

  const hBack = () => {
    navigate(-1);
    dispatch(resetCurrentPokemon());
    dispatch(resetEvolution());
  };

  const showSearchBar = isHomePage && !isMobile;
  const showMobileSearch = isHomePage && isMobile;

  return (
    <div className="header p-[1px] w-full sticky top-0 z-50 rounded-md">
      <header className="flex flex-col backdrop-blur-md bg-primary/90 rounded-md shadow-md relative">
        <nav className="flex justify-center items-center relative">
          <img
            src={PokeBall}
            alt="pokeball"
            width={40}
            height={40}
            className="drop-shadow-md mx-1"
          />
          <h1 className="text-4xl text-gray-100 font-bold py-3">Pokémon</h1>

          {/* SearchBar (desktop only, homepage) */}
          {showSearchBar && (
            <div className="absolute right-8">
              <SearchBar />
            </div>
          )}

          {/* Mobile menu toggle (homepage only) */}
          {isHomePage && (
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              className="absolute right-4 text-card lg:hidden hover:scale-110 transition-transform"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          )}

          {/* Back button (non-home pages) */}
          {!isHomePage && (
            <CustomTooltip message="Back">
              <Button
                variant="ghost"
                onClick={hBack}
                className="absolute left-3 lg:left-6 bg-primary-card/80 hover:bg-primary-card rounded-md transition-transform h-4"
              >
                <ChevronLeft className="text-card w-6 h-6" />
              </Button>
            </CustomTooltip>
          )}
        </nav>

        {/* Mobile SearchBar dropdown */}
        {showMobileSearch && (
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out rounded-b-md shadow-md ${isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <ul className="bg-inherit/90 text-white">
              <li className="w-full p-2">
                <SearchBar />
              </li>
            </ul>
          </div>
        )}

      </header>
    </div>
  );
}

export default Header;
