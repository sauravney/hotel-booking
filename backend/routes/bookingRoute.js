import express from "express";
import {
  handleCheckIn,
  fetchUserBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/web-checkin", handleCheckIn);
router.get("/bookings", fetchUserBookings);

export default router;
