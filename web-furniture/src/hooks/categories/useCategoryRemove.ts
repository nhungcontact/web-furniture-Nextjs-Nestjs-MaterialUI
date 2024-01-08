import "client-only";
import useMutation from "../useMutation";
import { Category } from "@/types/category";

function useCategoryRemove(id: string) {
  return useMutation<Category, unknown>({
    path: `/api/categories/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/categories`,
      shouldRemove: true,
    },
  });
}

export default useCategoryRemove;
