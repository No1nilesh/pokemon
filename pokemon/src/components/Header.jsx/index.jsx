/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SearchBar from "../SearchBar.jsx";
import { Menu, X } from "lucide-react";
import IsMobile from "../../../hooks/isMobile.jsx";
import PokeBall from "../../assets/pokeball.svg";
import { useLocation } from "react-router-dom";

function Header() {
  const isMobile = IsMobile();
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

  return (
    <div className="header p-[1px] sticky top-0 z-50 rounded-md clip">
      <header className="flex gap-2 flex-col bg-primary rounded-md clip">
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
          {!isMenuOpen ? (
            <Menu
              onClick={handleClick}
              className="text-white size-10 absolute right-2 cursor-pointer md:hidden"
            />
          ) : (
            <X
              onClick={handleClick}
              className="text-white size-10 absolute right-2 cursor-pointer md:hidden"
            />
          )}
        </nav>

        {/* Mobile SearchBar only on homepage */}
        {isMobile && isHomePage && (
          <ul
            ref={menuRef}
            className={`overflow-hidden bg-inherit text-white transition-all duration-300 ease-in-out z-40 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
