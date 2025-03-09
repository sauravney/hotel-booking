import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkin = () => {
  const navigate = useNavigate();
  const [checkinDetails, setCheckinDetails] = useState({
    familyMembers: [],
  });

  // Load booking data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    if (data) {
      setCheckinDetails({
        ...data,
        familyMembers: data.familyMembers.map((member) => ({
          ...member,
          aadhaar: "",
        })),
      });
    }
  }, []);

  // Handle Aadhaar input change
  const handleChange = (e, index) => {
    const updatedMembers = [...checkinDetails.familyMembers];
    updatedMembers[index][e.target.name] = e.target.value;
    setCheckinDetails({ ...checkinDetails, familyMembers: updatedMembers });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("checkinData", JSON.stringify(checkinDetails));
    navigate("/confirmation");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Web Check-in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold">Enter Aadhaar Details</h3>
        {checkinDetails.familyMembers.map((member, index) => (
          <div key={index} className="flex gap-4">
            <p className="w-1/2 p-2 border rounded bg-gray-200">
              {member.name} (Age: {member.age})
            </p>
            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={member.aadhaar}
              onChange={(e) => handleChange(e, index)}
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
        >
          Confirm Check-in
        </button>
      </form>
    </div>
  );
};

export default Checkin;
