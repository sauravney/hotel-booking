import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    familyMembers: [{ name: "", age: "" }],
  });

  // Handle input change
  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedFamily = [...bookingDetails.familyMembers];
      updatedFamily[index][e.target.name] = e.target.value;
      setBookingDetails({ ...bookingDetails, familyMembers: updatedFamily });
    } else {
      setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    }
  };

  // Add new family member
  const addFamilyMember = () => {
    setBookingDetails({
      ...bookingDetails,
      familyMembers: [...bookingDetails.familyMembers, { name: "", age: "" }],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("bookingData", JSON.stringify(bookingDetails));
    navigate("/checkin");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Hotel Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={bookingDetails.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={bookingDetails.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={bookingDetails.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            name="checkin"
            value={bookingDetails.checkin}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="date"
            name="checkout"
            value={bookingDetails.checkout}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        <h3 className="text-xl font-semibold mt-4">Family Members</h3>
        {bookingDetails.familyMembers.map((member, index) => (
          <div key={index} className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={member.name}
              onChange={(e) => handleChange(e, index)}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={member.age}
              onChange={(e) => handleChange(e, index)}
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFamilyMember}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Family Member
        </button>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
        >
          Proceed to Check-in
        </button>
      </form>
    </div>
  );
};

export default Booking;
