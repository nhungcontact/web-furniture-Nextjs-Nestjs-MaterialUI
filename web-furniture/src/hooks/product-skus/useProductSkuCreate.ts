import "client-only";
import useMutation from "../useMutation";
import { ProductSku, ProductSkuCreateInput } from "@/types/product-sku";

function useProductSkuCreate() {
  return useMutation<ProductSku, ProductSkuCreateInput>({
    path: "/api/product-skus",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/product-skus`,
      insertOnNotFound: "start",
    },
  });
}

export default useProductSkuCreate;
