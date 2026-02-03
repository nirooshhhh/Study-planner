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

/* ✅ CORS — FIXED */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://study-planner-kohl.vercel.app",
      "https://study-planner-8gqr-psb3qvva5-niroshs-projects-2be42e2f.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* health check */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
