import "client-only";
import useMutation from "../useMutation";
import { Bill, BillUpdateInput } from "@/types/bill";

function useBillUpdateRequestCancel(id: string) {
  return useMutation<Bill, BillUpdateInput>({
    path: `/api/bills/request-cancel/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/bills`,
    },
  });
}

export default useBillUpdateRequestCancel;
