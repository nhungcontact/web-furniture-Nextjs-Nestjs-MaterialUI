import { GetProduct, Product } from "@/types/product";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProductDetail(id?: string) {
  return useSWR<
    GetProduct,
    ErrorResponse<Product>,
    FetchOptions<ListOptions<Product>> | null
  >(
    !id
      ? null
      : {
          path: `/api/products/${id}`,
        },
  );
}

export default useProductDetail;
