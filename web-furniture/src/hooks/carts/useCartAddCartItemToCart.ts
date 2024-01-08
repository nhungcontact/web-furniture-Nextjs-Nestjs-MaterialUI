import { Cart, CartUpdateInput } from "@/types/cart";
import "client-only";
import useMutation from "../useMutation";

function useCartItemToCart(id: string) {
  return useMutation<Cart, CartUpdateInput>({
    path: `/api/carts/add-cart-items/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/carts`,
    },
  });
}

export default useCartItemToCart;
