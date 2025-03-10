import { useEffect, useState, usenav } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Checkin = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({ name: "" });
  const [username, setUsername] = useState("");
  const [familyMembers, setFamilyMembers] = useState([
    { name: "", aadhaar: "" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/hotels.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedHotel = data.find((hotel) => hotel.id === parseInt(id));
        setHotel(selectedHotel);
      });
  }, [id]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index][name] = value;
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", aadhaar: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hotelName = hotel.name;
    const checkinData = { username, familyMembers, hotelName };
    const response = await fetch("http://localhost:5000/api/web-checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkinData),
    });
    if (response.ok) {
      alert("Check-in successful!");
      navigate(`/confirmation/${hotel.id}/${username}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Web Check-in at{" "}
        <span className="text-blue-500 underline font-bold">{hotel.name}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
          required
        />
        {familyMembers.map((member, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Family Member Name"
              value={member.name}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
              required
            />
            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={member.aadhaar}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFamilyMember}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          + Add Family Member
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkin;
