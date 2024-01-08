import { WarehouseReceipt } from "@/types/warehouse-receipt";
import "client-only";
import useMutation from "../useMutation";

function useWarehouseReceiptRemove(id: string) {
  return useMutation<WarehouseReceipt, unknown>({
    path: `/api/warehouse-receipts/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/warehouse-receipts`,
      shouldRemove: true,
    },
  });
}

export default useWarehouseReceiptRemove;
