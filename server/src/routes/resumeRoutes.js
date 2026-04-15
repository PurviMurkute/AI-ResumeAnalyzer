import express from "express";
import upload from "../utils/multer.js";
import { analyzeResume } from "../controllers/resumeController.js";

const analyzeResumeRouter = express.Router();

analyzeResumeRouter.post("/analyze", upload.single("file"), analyzeResume);

export default analyzeResumeRouter;