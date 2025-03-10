import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
// const PORT = process.env.PORT || 5000;

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
    process.env.SECRET_KEY
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
  const token = jwt.sign(
    { name: user.name, email: user.email },
    process.env.SECRET_KEY
  );
  res.json({ message: "Login successful", token });
});

app.use("/api", bookingRoutes);

app.listen(5000, () =>
  console.log(`Server running on port ${process.env.PORT}"));`)
);
