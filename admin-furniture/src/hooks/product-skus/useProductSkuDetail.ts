import { ProductSku } from "@/types/product-sku";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProductSkuDetail(id?: string) {
  return useSWR<
    ProductSku,
    ErrorResponse<ProductSku>,
    FetchOptions<ListOptions<ProductSku>> | null
  >(
    !id
      ? null
      : {
          path: `/api/product-skus/${id}`,
        },
  );
}

export default useProductSkuDetail;
