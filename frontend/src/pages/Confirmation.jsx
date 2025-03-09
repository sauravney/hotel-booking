import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const [checkinDetails, setCheckinDetails] = useState(null);

  // Load check-in data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkinData"));
    if (data) {
      setCheckinDetails(data);
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-green-600">
        🎉 Check-in Successful!
      </h2>
      <p className="text-lg mt-2">Your hotel booking has been confirmed.</p>

      {checkinDetails && (
        <div className="mt-6 p-4 border rounded-lg shadow-lg bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Booking Details</h3>
          <p>
            <strong>Name:</strong> {checkinDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {checkinDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {checkinDetails.phone}
          </p>
          <p>
            <strong>Check-in:</strong> {checkinDetails.checkin}
          </p>
          <p>
            <strong>Check-out:</strong> {checkinDetails.checkout}
          </p>
          <h3 className="text-lg font-semibold mt-3">Family Members</h3>
          <ul className="text-left">
            {checkinDetails.familyMembers.map((member, index) => (
              <li key={index} className="border-b py-2">
                {member.name} (Age: {member.age}) - Aadhaar: {member.aadhaar}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
