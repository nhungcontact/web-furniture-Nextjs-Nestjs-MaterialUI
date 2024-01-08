import "client-only";
import useMutation from "../useMutation";
import { Promotion, PromotionUpdateInput } from "@/types/promotion";

function usePromotionUpdate(id: string) {
  return useMutation<Promotion, PromotionUpdateInput>({
    path: `/api/promotions/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/promotions`,
    },
  });
}

export default usePromotionUpdate;
