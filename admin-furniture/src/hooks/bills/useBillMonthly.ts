import { MonthlyBillItem } from "@/types/bill";
import { ErrorResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBillMonthly(year: number) {
  return useSWR<MonthlyBillItem[], ErrorResponse<MonthlyBillItem>>(
    !year
      ? null
      : {
          path: `/api/bills/statics/monthly/${year}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillMonthly;
