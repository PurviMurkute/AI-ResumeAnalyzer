import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connDB from "./config/dbConnect.js";
import analyzeResumeRouter from "./routes/resumeRoutes.js";
import cors from "cors";
import passport from './config/passport.js';

dotenv.config();

connDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/api/auth", authRouter);
app.use("/api/resume", analyzeResumeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
