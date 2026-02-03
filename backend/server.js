import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import chatRoutes from "./routes/chat.js";

connectDB();

const app = express();

/* 1️⃣ CORS middleware */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://study-planner-8gqr.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 2️⃣ THIS LINE GOES HERE 👇 */
app.options("*", cors());

/* 3️⃣ Body parser */
app.use(express.json());

/* 4️⃣ Health check */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* 5️⃣ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
