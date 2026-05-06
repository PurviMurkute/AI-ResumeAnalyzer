import AnalyzeResume from "../models/analyzeResume.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import fileUploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

// retry logic
const generateWithRetry = async (prompt, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.log(`Retry ${i + 1}...`);

      if (i === retries - 1) throw error;

      await new Promise((res) => setTimeout(res, 2000));
    }
  }
};

const analyzeResume = async (req, res) => {
  const { jobDescription } = req.body;
  const userId = req.user._id;
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload to Cloudinary
    const cloudinaryUrl = await fileUploadOnCloudinary(file.path);

    if (!cloudinaryUrl) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(file.path);

    // delete local file after use
    fs.unlinkSync(file.path);

    // Prompt
    const prompt = `
You are an ATS (Applicant Tracking System) used by recruiters.

Task:
Analyze the resume based on the most relevant role inferred from the resume content.

${
  jobDescription
    ? "Also compare the resume with the job description and identify missing important keywords."
    : "Also extract important keywords from the resume."
}

Return ONLY valid JSON in this format:

${
  jobDescription
    ? `{
  "ats_score": number (0-10),
  "score_type": "job_match",
  "suggestions": ["max 3 short actionable points"],
  "strengths": ["max 3 short points"],
  "weaknesses": ["max 3 short points"],
  "missing_keywords": ["max 5 important technical keywords"]
}`
    : `{
  "ats_score": number (0-10),
  "score_type": "general",
  "suggestions": ["max 3 short actionable points"],
  "strengths": ["max 3 short points"],
  "weaknesses": ["max 3 short points"],
  "extracted_keywords": ["max 5 important technical keywords"]
}`
}

Rules:
- ats_score must be an integer between 0 and 10
- suggestions must be short (1 line each)
- strengths & weaknesses must be concise
- keywords must be technical skills/tools only
- no extra text, no explanation

${jobDescription ? `Job Description:\n${jobDescription}` : ""}

Resume:
${resumeText}
`;

    const analysis = await generateWithRetry(prompt);

    // JSON parsing
    let cleaned = analysis
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { ats_score: null, suggestions: [] };
    }

    const analyzeResumeDoc = new AnalyzeResume({
      resume: cloudinaryUrl,
      jobDescription: jobDescription,
      analysisResult: parsed,
      score: parsed.ats_score,
      userId,
    });

    await analyzeResumeDoc.save();

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: analyzeResumeDoc,
    });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.message.includes("503")) {
      return res.status(503).json({
        success: false,
        message: "AI service is busy. Try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllAnalysesHistoryByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const analyses = await AnalyzeResume.find({ userId });

    if (!analyses.length) {
      return res.status(404).json({
        success: false,
        message: "No analyses found",
      });
    }
    return res.status(200).json({
      success: true,
      data: analyses,
      count: analyses.length,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileWithExtension = parts.slice(-1)[0];
  const folder = parts.slice(-2, -1)[0];

  const publicId = `${folder}/${fileWithExtension.split(".")[0]}`;
  return publicId;
};

const deleteAnalysis = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const Analysis = await AnalyzeResume.findById({
      _id: id,
      userId,
    });
    console.log(Analysis);

    if (!Analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    // ✅ Extract public_id
    const publicId = getPublicIdFromUrl(Analysis.resume);

    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    // ✅ Delete from DB
    await AnalyzeResume.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
      Analysis,
    });
  }
};

export { analyzeResume, getAllAnalysesHistoryByUser, deleteAnalysis };
