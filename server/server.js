import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", taskRoutes);

// Error handling middleware
app.use(errorHandler);

// ❌ No app.listen() on Vercel
// ✅ Just export the app
export default app;
