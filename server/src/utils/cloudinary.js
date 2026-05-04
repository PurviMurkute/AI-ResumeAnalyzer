import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "resumes",
      type: "upload",
      access_mode: "public",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error.message);
    return null;
  }
};

export default fileUploadOnCloudinary;
