import "client-only";
import useMutation from "../useMutation";
import { PaymentMethod, CartPayment } from "@/types/bill";

function usePaymentConfirm() {
  return useMutation<CartPayment, PaymentMethod>({
    path: `/api/payments/confirm`,
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/payments`,
      insertOnNotFound: "start",
    },
  });
}

export default usePaymentConfirm;
