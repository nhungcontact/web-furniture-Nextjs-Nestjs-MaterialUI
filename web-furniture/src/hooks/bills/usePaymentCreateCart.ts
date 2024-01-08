import { BillUpdateInput, CartPayment } from "@/types/bill";
import "client-only";
import useMutation from "../useMutation";

function usePaymentCreateCart() {
  return useMutation<CartPayment, BillUpdateInput>({
    path: "/api/payments/cart-payment",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/payments`,
      insertOnNotFound: "start",
    },
  });
}

export default usePaymentCreateCart;
