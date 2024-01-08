import { DatesBetween } from "@/types/bill";
import { ErrorResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBillRevenueBetweenDate(startDate: Date, endDate: Date) {
  return useSWR<DatesBetween[], ErrorResponse<DatesBetween>>(
    !startDate && !endDate
      ? null
      : {
          path: `/api/bills/revenue-between-dates/${startDate}/${endDate}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillRevenueBetweenDate;
