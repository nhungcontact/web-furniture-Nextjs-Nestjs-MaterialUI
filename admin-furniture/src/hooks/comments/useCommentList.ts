import { GetComment } from "@/types/comment";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCommentList(params?: ListOptions<GetComment>) {
  return useSWR<
    ListResponse<GetComment>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetComment>>
  >(
    {
      path: "/api/comments",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useCommentList;
