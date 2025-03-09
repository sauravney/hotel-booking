import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 bg-gradient-to-b from-[#e0c6ff] to-[#ffffff] py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-black-600">
          HotelBooking
        </Link>
        <div className="space-x-4">
          <Link to="/hotels" className="text-gray-700  hover:text-gray-500">
            Hotels
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-gray-500">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-gray-500">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
