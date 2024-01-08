import { ProcessingStatus } from "@/types/request-cancel";

export const setRequestOrderBill = (value: string) => {
  if (value === ProcessingStatus.Pending) {
    return 1;
  } else if (value === ProcessingStatus.Approved) {
    return 2;
  } else if (value === ProcessingStatus.Denied) {
    return 3;
  } else {
    return 0;
  }
};
