import AnalyzeResume from "../models/analyzeResume.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import fileUploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { createCache, getCache, flushCache } from "../utils/cache.js";

dotenv.config();

const getUserResumeAnalysisCacheKey = (userId) => `Analysis:${userId}`;

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.2,
  },
});

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
You are a professional ATS (Applicant Tracking System) and technical recruiter.

Your task is to evaluate the resume objectively and consistently.

Scoring Criteria:
- Skills relevance
- Technical stack depth
- Project quality
- Experience relevance
- Resume clarity
- ATS keyword optimization
- Impact and achievements

Important:
- Be strict but fair
- Keep scoring consistent for the same resume
- Avoid random scoring changes
- Focus on technical evaluation only

${
  jobDescription
    ? `
Compare the resume against the provided job description.
Identify missing important technical keywords and skill gaps.
`
    : `
Infer the most suitable role from the resume itself.
Extract the strongest technical keywords from the resume.
`
}

Return ONLY valid JSON.

${
  jobDescription
    ? `{
  "ats_score": number,
  "score_type": "job_match",
  "suggestions": ["max 3 concise actionable improvements"],
  "strengths": ["max 3 concise strengths"],
  "weaknesses": ["max 3 concise weaknesses"],
  "missing_keywords": ["max 5 technical keywords"]
}`
    : `{
  "ats_score": number,
  "score_type": "general",
  "suggestions": ["max 3 concise actionable improvements"],
  "strengths": ["max 3 concise strengths"],
  "weaknesses": ["max 3 concise weaknesses"],
  "extracted_keywords": ["max 5 technical keywords"]
}`
}

Rules:
- ATS score must be integer from 0-10
- Suggestions must be short and actionable
- Avoid generic advice
- Keywords must contain only technologies, tools, frameworks, or skills
- No markdown
- No explanation
- No extra text
- Output raw JSON only

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

    // Flush cache for this users analyses
    flushCache(getUserResumeAnalysisCacheKey(userId));
    console.log(
      "Cache flushed for key:",
      getUserResumeAnalysisCacheKey(userId),
    );

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
    const analyses = [];

    const analysisFromRedis = await getCache(
      getUserResumeAnalysisCacheKey(userId),
    );
    if (analysisFromRedis) {
      analyses = analysisFromRedis;
    } else {
      analyses = await AnalyzeResume.find({ userId }).sort({
        createdAt: -1,
      });
      await createCache(getUserResumeAnalysisCacheKey(userId), analyses);
      console.log(
        "Cache created for key:",
        getUserResumeAnalysisCacheKey(userId),
      );
    }

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

    // Flush cache for this user's analyses
    flushCache(getUserResumeAnalysisCacheKey(userId));
    console.log(
      "Cache flushed for key:",
      getUserResumeAnalysisCacheKey(userId),
    );

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
