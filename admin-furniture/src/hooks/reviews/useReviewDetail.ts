import { Review } from "@/types/review";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useReviewDetail(id?: string) {
  return useSWR<Review, ErrorResponse<Review>, FetchOptions<ListOptions<Review>> | null>(
    !id
      ? null
      : {
          path: `/api/reviews/${id}`,
        },
  );
}

export default useReviewDetail;
