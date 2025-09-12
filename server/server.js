import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Root route
app.get("/", (req, res) => res.send("API working"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

// Start server
app.listen(PORT, () => console.log(`WORKING on PORT ${PORT}`));
