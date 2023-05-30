import { Schema, model } from "mongoose";
import { Category } from "../interfaces/category.interface.js";

const CategorySchema = new Schema<Category>(
  {
    name: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
