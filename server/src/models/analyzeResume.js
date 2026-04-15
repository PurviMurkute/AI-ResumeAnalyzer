import { Schema, model } from "mongoose";

const analyzeResumeSchema = new Schema(
  {
    resume: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    analysisResult: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AnalyzeResume = model("AnalyzeResume", analyzeResumeSchema);

export default AnalyzeResume;
