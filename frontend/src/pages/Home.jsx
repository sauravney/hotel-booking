import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?hotel,resort')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center text-white p-6 max-w-4xl">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Find Your Perfect Stay 🏨
        </h1>
        <p className="text-lg mt-3 opacity-90">
          Book luxurious and comfortable hotels for your family vacation.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-full max-w-md p-3 border-none rounded-l-lg focus:outline-none shadow-lg text-black"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all duration-300 shadow-lg">
            🔍 Search
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-6">
          <Link to="/login">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
