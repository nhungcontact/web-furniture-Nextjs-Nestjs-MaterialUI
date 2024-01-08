import "client-only";
import useMutation from "../useMutation";
import { Review, ReviewUpdateInput } from "@/types/review";

function useReviewUpdate(id: string) {
  return useMutation<Review, ReviewUpdateInput>({
    path: `/api/reviews/update-status/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/reviews`,
    },
  });
}

export default useReviewUpdate;
