import "client-only";
import useMutation from "../useMutation";
import { ProductSku } from "@/types/product-sku";

function useProductSkuRemove(id: string) {
  return useMutation<ProductSku, unknown>({
    path: `/api/product-skus/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/product-skus`,
      shouldRemove: true,
    },
  });
}

export default useProductSkuRemove;
