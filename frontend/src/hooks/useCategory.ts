import useSWR from "swr";
// import useSWRMutation from "swr/mutation";

import {
  categoriesUrl,
  getAllCategoriesWithComplaints,
} from "../services/category.service";

const useAllCategoriesWithComplaints = () => {
  const { data, isLoading, error } = useSWR(
    categoriesUrl,
    getAllCategoriesWithComplaints
  );

  return { categoriesWithComplaints: data, isLoading, error };
};

export { useAllCategoriesWithComplaints };
