import "client-only";
import useMutation from "../useMutation";
import { Bill } from "@/types/bill";

function useBillRemove(id: string) {
  return useMutation<Bill, unknown>({
    path: `/api/bills/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/bills`,
      shouldRemove: true,
    },
  });
}

export default useBillRemove;
