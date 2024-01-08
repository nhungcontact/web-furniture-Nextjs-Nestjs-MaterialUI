import "client-only";
import useMutation from "../useMutation";
import { Review, ReviewCreateInput } from "@/types/review";

function useReviewCreate() {
  return useMutation<Review, ReviewCreateInput>({
    path: "/api/reviews",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/reviews`,
      insertOnNotFound: "start",
    },
  });
}

export default useReviewCreate;
