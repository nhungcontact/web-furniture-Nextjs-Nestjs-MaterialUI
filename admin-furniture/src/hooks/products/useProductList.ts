import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetProduct, Product } from "@/types/product";

function useProductList(params?: ListOptions<Product>) {
  return useSWR<
    ListResponse<GetProduct>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Product>>
  >(
    {
      path: "/api/products",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProductList;
