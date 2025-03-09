import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Hotels from "./pages/Hotels.jsx";
import HotelDetails from "./pages/HotelDetails.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Checkin from "./pages/CheckIn.jsx";
import Booking from "./pages/Booking.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
