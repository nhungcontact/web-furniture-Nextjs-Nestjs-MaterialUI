import "client-only";
import useMutation from "../useMutation";
import { Promotion } from "@/types/promotion";

function usePromotionRemove(id: string) {
  return useMutation<Promotion, unknown>({
    path: `/api/promotions/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/promotions`,
      shouldRemove: true,
    },
  });
}

export default usePromotionRemove;
