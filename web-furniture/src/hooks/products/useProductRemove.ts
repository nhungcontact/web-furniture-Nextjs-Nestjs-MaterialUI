import "client-only";
import useMutation from "../useMutation";
import { Product } from "@/types/product";

function useProductRemove(id: string) {
  return useMutation<Product, unknown>({
    path: `/api/products/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/products`,
      shouldRemove: true,
    },
  });
}

export default useProductRemove;
