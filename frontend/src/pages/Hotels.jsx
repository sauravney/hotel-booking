import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/data/hotels.json")
      .then((response) => response.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Available Hotels</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>Price: ₹{hotel.price} per night</p>
            <p>Rating: ⭐ {hotel.rating}</p>
            <Link to={`/hotels/${hotel.id}`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
