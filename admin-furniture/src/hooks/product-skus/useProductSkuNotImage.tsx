import "client-only";
import useMutation from "../useMutation";
import { ProductSku, ProductSkuUpdateInput } from "@/types/product-sku";

function useProductSkuNotImage(id: string) {
  return useMutation<ProductSku, ProductSkuUpdateInput>({
    path: `/api/product-skus/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/product-skus`,
    },
  });
}

export default useProductSkuNotImage;
