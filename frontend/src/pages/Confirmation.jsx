import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Confirmation = () => {
  const { id, username } = useParams({ id: 0, username: "" });
  const [bookingDetails, setBookingDetails] = useState(null);
  const [hotel, setHotel] = useState({ name: "" });

  useEffect(() => {
    fetch("/data/hotels.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedHotel = data.find((hotel) => hotel.id === parseInt(id));
        setHotel(selectedHotel);
      });

    fetch(`http://localhost:5000/api/bookings?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setBookingDetails(data[0]);
        } else {
          setBookingDetails(null);
        }
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [id]);

  if (!bookingDetails) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading booking details...
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      <p className="text-lg font-semibold">
        Hotel: <span className="text-blue-500">{hotel.name}</span>
      </p>
      <p className="text-lg">
        Username: <span className="font-medium">{bookingDetails.username}</span>
      </p>
      <h3 className="font-semibold mt-4">Family Members:</h3>
      <ul className="list-disc pl-6 mt-2">
        {bookingDetails.familyMembers &&
        bookingDetails.familyMembers.length > 0 ? (
          bookingDetails.familyMembers.map((member, index) => (
            <li key={index} className="text-gray-700">
              {member.name} - Aadhaar: {member.aadhaar}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No family members listed.</p>
        )}
      </ul>
      <div className="mt-6 flex justify-between">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Home
        </Link>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => alert("Booking confirmed!")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
