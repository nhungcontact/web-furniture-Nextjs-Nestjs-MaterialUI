import { ProductSku } from "@/types/product-sku";
import { ReviewCreateInput } from "@/types/review";
import "client-only";
import useMutation from "../useMutation";

function useProductSkuAddReview(id: string) {
  return useMutation<ProductSku, ReviewCreateInput>({
    path: `/api/product-skus/reviews/add/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/product-skus`,
    },
  });
}

export default useProductSkuAddReview;
