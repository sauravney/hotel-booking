import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 bg-gradient-to-b from-[#e0c6ff] to-[#ffffff] py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-black-600">
          HotelBooking
        </Link>
        <div className="space-x-4 flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
          <Link
            to="/hotels"
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            Hotels
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
