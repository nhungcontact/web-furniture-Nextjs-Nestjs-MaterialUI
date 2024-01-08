import { GetComment } from "@/types/comment";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCommentDetail(id?: string) {
  return useSWR<
    GetComment,
    ErrorResponse<GetComment>,
    FetchOptions<ListOptions<GetComment>> | null
  >(
    !id
      ? null
      : {
          path: `/api/comments/${id}`,
        },
  );
}

export default useCommentDetail;
