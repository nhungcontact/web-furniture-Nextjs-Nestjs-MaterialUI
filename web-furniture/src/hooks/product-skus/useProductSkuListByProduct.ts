import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetProductSku } from "@/types/product-sku";

function useProductSkuListByProduct(params?: ListOptions<GetProductSku>, id?: string) {
  return useSWR<
    ListResponse<GetProductSku>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetProductSku>>
  >(
    {
      path: `/api/product-skus/all/${id}`,
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProductSkuListByProduct;
