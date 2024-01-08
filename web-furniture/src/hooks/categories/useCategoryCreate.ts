import "client-only";
import useMutation from "../useMutation";
import { Category, CategoryCreateInput } from "@/types/category";

function useCategoryCreate() {
  return useMutation<Category, CategoryCreateInput>({
    path: "/api/categories",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/categories`,
      insertOnNotFound: "start",
    },
  });
}

export default useCategoryCreate;
