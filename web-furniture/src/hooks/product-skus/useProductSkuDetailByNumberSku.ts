import { GetProductSku } from "@/types/product-sku";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProductSkuDetailByNumberSku(numberSku?: string) {
  return useSWR<
    GetProductSku,
    ErrorResponse<GetProductSku>,
    FetchOptions<ListOptions<GetProductSku>> | null
  >(
    !numberSku
      ? null
      : {
          path: `/api/product-skus/numberSKU/${numberSku}`,
        },
  );
}

export default useProductSkuDetailByNumberSku;
