import "client-only";
import useMutation from "../useMutation";
import { Bill, BillCreateInput } from "@/types/bill";

function useBillCreate() {
  return useMutation<Bill, BillCreateInput>({
    path: "/api/bills",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/bills`,
      insertOnNotFound: "start",
    },
  });
}

export default useBillCreate;
