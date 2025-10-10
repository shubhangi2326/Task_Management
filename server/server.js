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
app.use(cors({
  origin: "https://vercel.com/shubhangi2326s-projects/task-management-onuq/FdumN5qiVzkyek4rsNPHwJdc5gXL"
}));
// API routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
