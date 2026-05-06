import express from "express";
import upload from "../middlewares/multer.js";
import { analyzeResume, deleteAnalysis, getAllAnalysesHistoryByUser } from "../controllers/resumeController.js";
import verifyJwt from "../middlewares/jwt.js";

const analyzeResumeRouter = express.Router();

analyzeResumeRouter.post(
  "/analyze",
  upload.single("file"),
  verifyJwt,
  analyzeResume,
);

analyzeResumeRouter.get("/history", verifyJwt, getAllAnalysesHistoryByUser);

analyzeResumeRouter.delete("/delete/:id", verifyJwt, deleteAnalysis);

export default analyzeResumeRouter;
