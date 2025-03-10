import { useEffect, useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const username = "testuser"; // Replace with logged-in user data

  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings?username=${username}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [username]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="p-4 border rounded-md mb-4">
            <h3 className="text-xl font-semibold">{booking.hotelName}</h3>
            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(booking.checkInDate).toDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(booking.checkOutDate).toDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Booking;
