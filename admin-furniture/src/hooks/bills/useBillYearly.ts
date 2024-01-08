import { YearlyBillItem } from "@/types/bill";
import { ErrorResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBillYearly() {
  return useSWR<YearlyBillItem, ErrorResponse<YearlyBillItem>>(
    {
      path: `/api/bills/statics/yearly`,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillYearly;
