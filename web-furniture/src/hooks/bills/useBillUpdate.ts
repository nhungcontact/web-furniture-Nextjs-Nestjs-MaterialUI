import "client-only";
import useMutation from "../useMutation";
import { Bill, BillUpdateInput } from "@/types/bill";

function useBillUpdate() {
  return useMutation<Bill, BillUpdateInput>({
    path: `/api/bills/add-bill-items`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/bills`,
    },
  });
}

export default useBillUpdate;
