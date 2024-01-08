import { BillHead } from "@/types/bill";

export const billHeadCells: readonly BillHead[] = [
  {
    id: "number",
    label: "Number",
  },
  {
    id: "user",
    label: "User",
  },

  {
    id: "grandTotal",
    label: "Grand Total",
  },

  {
    id: "promotionPrice",
    label: "Promotion Price",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
  },
  {
    id: "createdAt",
    label: "Created",
  },
  {
    id: "status",
    label: "Status",
  },
];
