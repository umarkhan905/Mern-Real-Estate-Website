import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center  px-3 py-2">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-sm sm:text-xl font-bold flex flex-wrap items-center">
            <span className="text-slate-500">UK</span>
            <span className="text-slate-700">Properties</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="flex items-center bg-slate-100 rounded-lg p-2">
          <input
            type="tex"
            className="w-24 sm:w-64 bg-transparent outline-none"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600" />
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                className="w-7 h-7 rounded-full object-cover"
                alt="Profile Image"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
