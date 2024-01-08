import { WarehouseReceipt, WarehouseReceiptUpdateInput } from "@/types/warehouse-receipt";
import "client-only";
import useMutation from "../useMutation";

function useWarehouseReceiptAddWRD() {
  return useMutation<WarehouseReceipt, WarehouseReceiptUpdateInput>({
    path: `/api/warehouse-receipts/add-WR-detail`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/warehouse-receipts`,
    },
  });
}

export default useWarehouseReceiptAddWRD;
