import { GetReview, Review } from "@/types/review";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

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
