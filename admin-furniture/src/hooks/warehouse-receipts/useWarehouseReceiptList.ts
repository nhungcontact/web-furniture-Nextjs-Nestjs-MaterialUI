import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import { GetWarehouseReceipt } from "@/types/warehouse-receipt";
import "client-only";
import useSWR from "swr";

function useWarehouseReceiptList(params?: ListOptions<GetWarehouseReceipt>) {
  return useSWR<
    ListResponse<GetWarehouseReceipt>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetWarehouseReceipt>>
  >(
    {
      path: "/api/warehouse-receipts",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useWarehouseReceiptList;
