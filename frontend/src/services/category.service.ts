import { baseUrl } from "../constants/routes";
import { Category } from "../interfaces/category.interface";

export const categoriesUrl = baseUrl + "/api/categories";

const getAllCategoriesWithComplaints = async (url: string) => {
  const response = await fetch(`${url}-complaints`);
  const data = await response.json() as Category[];
  return data;
};



export { getAllCategoriesWithComplaints };
