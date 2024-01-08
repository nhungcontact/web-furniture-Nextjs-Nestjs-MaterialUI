import "client-only";
import useSWR from "swr";

function useBillSalesPerformance(year: number) {
  return useSWR<number>(
    !year
      ? null
      : {
          path: `/api/bills/performance/${year}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillSalesPerformance;
