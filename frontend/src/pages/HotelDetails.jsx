import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    fetch("/data/hotels.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedHotel = data.find((hotel) => hotel.id === parseInt(id));
        setHotel(selectedHotel);
      });
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-4">{hotel.name}</h2>
      <p>{hotel.location}</p>
      <p>Price: ₹{hotel.price} per night</p>
      <p>Rating: ⭐ {hotel.rating}</p>
      <Link to={`/checkin/${hotel.id}`}>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default HotelDetails;
