import { Review } from "@/types/review";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useReviewAverageRating(params?: ListOptions<Review>) {
  return useSWR<number, ErrorResponse<ListOptions>, FetchOptions<ListOptions<Review>>>(
    {
      path: `/api/reviews/average-rating`,
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useReviewAverageRating;
