import "client-only";
import useMutation from "../useMutation";
import { Promotion, PromotionCreateInput } from "@/types/promotion";

function usePromotionCreate() {
  return useMutation<Promotion, PromotionCreateInput>({
    path: "/api/promotions",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/promotions`,
      insertOnNotFound: "start",
    },
  });
}

export default usePromotionCreate;
