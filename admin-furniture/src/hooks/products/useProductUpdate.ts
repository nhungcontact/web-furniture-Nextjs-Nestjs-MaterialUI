import "client-only";
import useMutation from "../useMutation";
import { Product, ProductUpdateInput } from "@/types/product";

function useProductUpdate(id: string) {
  return useMutation<Product, ProductUpdateInput>({
    path: `/api/products/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/products`,
    },
  });
}

export default useProductUpdate;
