import { configCloudinary } from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(configCloudinary);

const uploadImage = async (filePath: string) => {
  const imageCloudinary = await cloudinary.uploader.upload(filePath, {
    folder: "topics",
  });

  return imageCloudinary;
};

const deleteImage = async (public_id: string) => {
  const deletedImage = await cloudinary.uploader.destroy(public_id);
  return deletedImage;
};

export { uploadImage, deleteImage };
