import { Bill, GetBill } from "@/types/bill";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBillDetail(id?: string) {
  return useSWR<GetBill, ErrorResponse<Bill>, FetchOptions<ListOptions<Bill>> | null>(
    !id
      ? null
      : {
          path: `/api/bills/${id}`,
        },
  );
}

export default useBillDetail;
