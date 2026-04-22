import { Schema, model } from "mongoose";

const analyzeResumeSchema = new Schema(
  {
    resume: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
    },
    analysisResult: {
      type: Object,
      required: true,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const AnalyzeResume = model("AnalyzeResume", analyzeResumeSchema);

export default AnalyzeResume;
