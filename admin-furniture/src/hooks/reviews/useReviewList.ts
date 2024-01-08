import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetReview, Review } from "@/types/review";

function useReviewList(params?: ListOptions<Review>) {
  return useSWR<
    ListResponse<GetReview>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Review>>
  >(
    {
      path: "/api/reviews",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useReviewList;
