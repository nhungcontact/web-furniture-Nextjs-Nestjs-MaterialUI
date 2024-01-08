import { WarehouseReceipt, WarehouseReceiptCreateInput } from "@/types/warehouse-receipt";
import "client-only";
import useMutation from "../useMutation";

function useWarehouseReceiptCreate() {
  return useMutation<WarehouseReceipt, WarehouseReceiptCreateInput>({
    path: "/api/warehouse-receipts",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/warehouse-receipts`,
      insertOnNotFound: "start",
    },
  });
}

export default useWarehouseReceiptCreate;
