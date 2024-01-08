import "client-only";
import useMutation from "../useMutation";
import { Review } from "@/types/review";

function useReviewRemove(id: string) {
  return useMutation<Review, unknown>({
    path: `/api/reviews/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/reviews`,
      shouldRemove: true,
    },
  });
}

export default useReviewRemove;
