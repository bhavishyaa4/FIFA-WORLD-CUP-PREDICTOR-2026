import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";

function NavBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", search);
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 bg-black/40 backdrop-blur-md fixed top-0 left-0 text-white z-50">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
      </div>

      {/* <form
        onSubmit={handleSearch}
        className="flex items-center w-full sm:w-auto"
      >
        <input
          type="text"
          placeholder="Search Bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-l-full bg-gray-800 text-white outline-none w-full sm:w-64 text-sm sm:text-base font-poppins"
        />

        <button
          type="submit"
          className="px-3 sm:px-4 py-2 bg-green-500 text-black font-bold rounded-r-full hover:bg-green-400 transition text-sm sm:text-base cursor-pointer font-poppins"
        >
          Search
        </button>
      </form> */}
    </nav>
  );
}

export default NavBar;
