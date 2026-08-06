import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const absolutePath = path.resolve(localFilePath);

    if (!fs.existsSync(absolutePath)) {
      console.error("❌ File does not exist at path:", absolutePath);
      return null;
    }

    console.log("Uploading file from path:", absolutePath);

    const result = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("✅ Upload Success:", result.secure_url);

    // Delete local temp file after successful upload
    try {
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch (unlinkError) {
      console.warn("⚠️ Could not delete temp file:", unlinkError.message);
    }

    return result;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error Details:", error);

    // Clean up on failure
    try {
      const absolutePath = path.resolve(localFilePath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch (cleanupError) {
      console.warn("⚠️ Cleanup failed:", cleanupError.message);
    }

    return null;
  }
};

export default uploadOnCloudinary;