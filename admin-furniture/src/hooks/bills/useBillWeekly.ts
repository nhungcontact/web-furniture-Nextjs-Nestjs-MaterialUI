import { WeeklyBillItem } from "@/types/bill";
import { ErrorResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBillWeekly(year: number, month: number, week: number) {
  return useSWR<WeeklyBillItem[], ErrorResponse<WeeklyBillItem>>(
    !year && !month && !week
      ? null
      : {
          path: `/api/bills/statics/${week}/weekly/${month}/monthly/${year}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillWeekly;
