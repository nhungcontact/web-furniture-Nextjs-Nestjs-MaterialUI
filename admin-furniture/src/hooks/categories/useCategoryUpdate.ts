import "client-only";
import useMutation from "../useMutation";
import { Category, CategoryUpdateInput } from "@/types/category";

function useCategoryUpdate(id: string) {
  return useMutation<Category, CategoryUpdateInput>({
    path: `/api/categories/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/categories`,
    },
  });
}

export default useCategoryUpdate;
