import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../AuthSlice";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Discover", href: "/movies" },
  { name: "All Stars", href: "/allstars" },
  { name: "Up Next", href: "/upnext" },
];

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, isLoggedIn } = useSelector((state) => state.MovieUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    setDropdownOpen(false); 
    navigate("/login");
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <Link to="/" className="text-2xl font-bold flex items-end">
            <span className="text-yellow-500 ml-1">cine</span>
            <span className="text-white ml-1">Haven</span>
          </Link>

      
          <div className="hidden sm:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-md px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 relative">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-black font-bold"
                >
                  {userData?.name?.[0]?.toUpperCase() || "U"}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-yellow-500 text-yellow-500 px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-500 hover:text-black transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
