import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetProductSku, ProductSku } from "@/types/product-sku";

function useProductSkuList(params?: ListOptions<ProductSku>) {
  return useSWR<
    ListResponse<GetProductSku>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<ProductSku>>
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
