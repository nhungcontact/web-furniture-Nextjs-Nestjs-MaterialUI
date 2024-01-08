import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Bill, GetBill } from "@/types/bill";

function useBillList(params?: ListOptions<Bill>) {
  return useSWR<
    ListResponse<GetBill>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Bill>>
  >(
    {
      path: "/api/bills",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useBillList;
