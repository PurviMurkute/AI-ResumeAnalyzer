import express from "express";
import upload from "../middlewares/multer.js";
import { analyzeResume } from "../controllers/resumeController.js";
import verifyJwt from "../middlewares/jwt.js";

const analyzeResumeRouter = express.Router();

analyzeResumeRouter.post(
  "/analyze",
  upload.single("file"),
  verifyJwt,
  analyzeResume,
);

export default analyzeResumeRouter;
