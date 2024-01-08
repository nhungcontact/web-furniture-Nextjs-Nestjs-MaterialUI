import "client-only";
import useMutation from "../useMutation";
import { Bill, BillUpdateInput } from "@/types/bill";

function useBillUpdate(id: string) {
  return useMutation<Bill, BillUpdateInput>({
    path: `/api/bills/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/bills`,
    },
  });
}

export default useBillUpdate;
