import { Request, Response } from "express";
import CategoryService from "../services/category.service.js";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await CategoryService.getAllCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { getAllCategories };
