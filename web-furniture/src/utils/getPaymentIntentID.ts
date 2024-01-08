import { CartPayment } from "@/types/bill";

export default function getPaymentIntentID(): CartPayment | undefined {
  const data = localStorage.getItem("cartPayment");
  if (data) {
    const dataParse = JSON.parse(data) as CartPayment;
    return dataParse;
  }
  return undefined;
}
