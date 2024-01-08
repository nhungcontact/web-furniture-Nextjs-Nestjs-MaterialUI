import { BillItemHead } from "@/types/bill-item";

export const billItemHeadCells: readonly BillItemHead[] = [
  {
    id: "productSku",
    label: "Product",
  },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "totalPrice",
    label: "Total Price",
  },
];
