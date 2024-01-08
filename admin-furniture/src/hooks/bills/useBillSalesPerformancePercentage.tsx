import "client-only";
import useSWR from "swr";

function useBillSalesPerformancePercentage(year: number, month: number) {
  return useSWR<number>(
    !year && !month
      ? null
      : {
          path: `/api/bills/performance-percentage/${month}/${year}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillSalesPerformancePercentage;
