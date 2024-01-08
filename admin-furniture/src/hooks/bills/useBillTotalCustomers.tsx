import "client-only";
import useSWR from "swr";

function useBillTotalCustomers() {
  return useSWR<number>(
    {
      path: `/api/bills/total-customer`,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillTotalCustomers;
