import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Handle Check-in
export const handleCheckIn = async (req, res) => {
  const { username, hotelName, checkInDate, familyMembers } = req.body;

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new booking with family members
    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        hotelName,
        checkInDate: new Date(checkInDate),
        familyMembers: {
          create: familyMembers.map((member) => ({
            name: member.name,
            aadhaar: member.aadhaar,
          })),
        },
      },
    });

    res.json({ message: "Check-in successful!", booking: newBooking });
  } catch (error) {
    console.error("Error during check-in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get User Bookings
export const fetchUserBookings = async (req, res) => {
  const { username } = req.query;

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch bookings for the user
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        hotelName: true,
        checkInDate: true,
        familyMembers: {
          select: { name: true, aadhaar: true },
        },
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
