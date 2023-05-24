import { UploadedFile } from "express-fileupload";

import { fileUploadType } from "../interfaces/fileUploadType.js";

import CategoryModel from "../models/category.model.js";

const getAllCategories = async () => {
  const allCategories = await CategoryModel.find();
  return allCategories;
};

const addCategory = async (name: string, files: fileUploadType) => {
  if (files?.image) {
    const cateroyImage = files.image as UploadedFile;
    // TODO: guardar la imagen en cloudinary
  } else {
    return { message: "No envio una foto" };
  }

  const newCategory = await CategoryModel.create({ name, image: "" });
  return newCategory;
};

const updateCategory = async (name: string, files: fileUploadType) => {};

const getCategory = async (id: string) => {};

const deleteCategory = async (id: string) => {};

export default {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
