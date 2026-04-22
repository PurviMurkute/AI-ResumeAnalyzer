import AnalyzeResume from "../models/analyzeResume.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import fileUploadOnCloudinary from "../utils/cloudinary.js";

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
  const {jobDescription} = req.body;
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
If a job description is provided, prioritize matching the resume against it.

Return ONLY valid JSON in this format:
{
  "ats_score": number (0-10),
  "suggestions": ["max 3 short actionable points"]
  "strengths": ["max 3 short points about resume strengths"]
  "weaknesses": ["max 3 short points about resume weaknesses"]
}

Rules:
- ats_score must be an integer between 0 and 10
- suggestions must be short (1 line each)
- maximum 3 suggestions
- no extra text, no explanation

${req.body.jobDescription ? `Job Description:\n${req.body.jobDescription}` : ""}

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

export { analyzeResume };
