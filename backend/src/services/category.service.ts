import { UploadedFile } from "express-fileupload";

import { fileUploadType } from "../interfaces/fileUploadType.js";

import CategoryModel from "../models/category.model.js";
import ComplaintModel from "../models/complaint.model.js";

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

// Obtiene todas las categorias de las denuncias con sus denuncias que se han registrado
const getAllCategoriesWithComplaints = async () => {
  const allCategories = await CategoryModel.find();

  const allCategoriesWithComplaints = Promise.all(
    allCategories.map(async (category) => {
      const complaints = await ComplaintModel.find({categoryId: category._id});
      
      return {
        _id: category._id,
        name: category.name,
        image: category.image,
        complaints,
      };
    })
  );

  return allCategoriesWithComplaints;
};

export default {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesWithComplaints,
};
