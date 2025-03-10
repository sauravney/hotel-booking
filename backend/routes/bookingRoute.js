import express from "express";
import {
  handleCheckIn,
  fetchUserBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ POST: Check-in API
router.post("/web-checkin", handleCheckIn);

// ✅ GET: Fetch user bookings
router.get("/bookings", fetchUserBookings);

export default router;
