import { WarehouseReceipt, WarehouseReceiptUpdateInput } from "@/types/warehouse-receipt";
import "client-only";
import useMutation from "../useMutation";

function useWarehouseReceiptUpdate(id?: string) {
  return useMutation<WarehouseReceipt, WarehouseReceiptUpdateInput>({
    path: `/api/warehouse-receipts/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/warehouse-receipts`,
    },
  });
}

export default useWarehouseReceiptUpdate;
