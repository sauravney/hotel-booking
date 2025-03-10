import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleCheckIn = async (req, res) => {
  const { username, familyMembers, hotelName } = req.body;

  try {
    if (!username || !hotelName) {
      return res
        .status(400)
        .json({ error: "Username and hotel name are required" });
    }
    let user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username },
    });
    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        hotelName,
        familyMembers: {
          create:
            familyMembers?.map((member) => ({
              name: member.name,
              aadhaar: member.aadhaar,
            })) || [],
        },
      },
      include: { familyMembers: true },
    });

    res
      .status(201)
      .json({ message: "Check-in successful!", booking: newBooking });
  } catch (error) {
    console.error("Error during check-in:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Aadhaar number must be unique." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchUserBookings = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      console.log("Username is missing in the request.");
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log("User not found for username:", username);
      return res.status(404).json({ error: "User not found" });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { familyMembers: true },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
