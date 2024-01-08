import { Bill, GetBill } from "@/types/bill";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

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
