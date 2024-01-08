import { BillStatus } from "@/types/bill";

export const setStatusBill = (value: string) => {
  if (value === BillStatus.Waiting) {
    return 1;
  } else if (value === BillStatus.Processing) {
    return 2;
  } else if (value === BillStatus.Shipping) {
    return 3;
  } else if (value === BillStatus.Success) {
    return 4;
  } else {
    return 0;
  }
};
