import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const showSearch = location.pathname === "/characters" || location.pathname === "/films";
  const isHomepage = location.pathname === "/";

  return (
    <div className="border-b border-gray-700">
      <div className="flex justify-between items-center p-4">
        <Link to="/" style={{ fontFamily: "'Star Wars', sans-serif" }} className="text-xl md:text-2xl text-yellow-200 no-underline">
            Star Wars Explorer
        </Link>
        <div className="flex items-center gap-4">
            {!isHomepage && (
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/films" className="text-white hover:text-yellow-200">Films</Link>
                    <Link to="/characters" className="text-white hover:text-yellow-200">Characters</Link>
                    <Link to="/favourites" className="text-white hover:text-yellow-200">Favourites</Link>
                </div>
            )}
          {showSearch && (
            <span className="hidden md:block">
              <Searchbar />
            </span>
          )}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          <Link to="/films" className="text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Films</Link>
          <Link to="/characters" className="text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Characters</Link>
          <Link to="/favourites" className="text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>Favourites</Link>
          {showSearch && <Searchbar />}
        </div>
      )}
    </div>
  );
};

export default Navbar;