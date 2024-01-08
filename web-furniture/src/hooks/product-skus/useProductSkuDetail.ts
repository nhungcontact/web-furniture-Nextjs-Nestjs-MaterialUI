import { GetProductSku } from "@/types/product-sku";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProductSkuDetail(id?: string) {
  return useSWR<
    GetProductSku,
    ErrorResponse<GetProductSku>,
    FetchOptions<ListOptions<GetProductSku>> | null
  >(
    !id
      ? null
      : {
          path: `/api/product-skus/${id}`,
        },
  );
}

export default useProductSkuDetail;
