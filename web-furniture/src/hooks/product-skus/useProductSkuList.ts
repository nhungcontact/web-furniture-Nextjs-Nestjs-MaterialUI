import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetProductSku } from "@/types/product-sku";

function useProductSkuList(params?: ListOptions<GetProductSku>) {
  return useSWR<
    ListResponse<GetProductSku>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetProductSku>>
  >(
    {
      path: "/api/product-skus",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProductSkuList;
