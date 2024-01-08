import { GetCartItem } from "@/types/cart-item";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCartItemDetail(id?: string) {
  return useSWR<
    GetCartItem,
    ErrorResponse<GetCartItem>,
    FetchOptions<ListOptions<GetCartItem>> | null
  >(
    !id
      ? null
      : {
          path: `/api/detail-carts/${id}`,
        },
  );
}

export default useCartItemDetail;
