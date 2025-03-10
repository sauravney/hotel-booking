import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
const SECRET_KEY = "Saurav@12345";

const users = [];

// REGISTER API
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);
  const token = jwt.sign(
    { name: newUser.name, email: newUser.email },
    SECRET_KEY
  );
  res.json({ message: "User registered successfully", token });
});

// LOGIN API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY);
  res.json({ message: "Login successful", token });
});

app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;
  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }
  res.json({ message: "Email exists" });
});

// ✅ Register routes
app.use("/api", bookingRoutes);

app.listen(5000, () =>
  console.log(`Server running on port ${process.env.PORT}"));`)
);
