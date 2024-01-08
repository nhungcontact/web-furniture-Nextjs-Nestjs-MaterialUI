/* eslint-disable @typescript-eslint/no-explicit-any */
import { TopCustomer } from "@/types/bill";
import "client-only";
import useSWR from "swr";

function useBillTopCustomerOfMonth(month: number, year: number) {
  return useSWR<TopCustomer>(
    !year && !month
      ? null
      : {
          path: `/api/bills/customer-of-month/${month}/${year}`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillTopCustomerOfMonth;
