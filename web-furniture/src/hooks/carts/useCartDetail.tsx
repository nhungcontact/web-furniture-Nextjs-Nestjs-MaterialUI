import { Cart, GetCart } from "@/types/cart";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCartDetail(id?: string) {
  return useSWR<GetCart, ErrorResponse<GetCart>, FetchOptions<ListOptions<Cart>> | null>(
    !id
      ? null
      : {
          path: `/api/carts/${id}`,
        },
  );
}

export default useCartDetail;
