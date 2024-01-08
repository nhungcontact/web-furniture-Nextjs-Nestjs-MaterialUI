import { GetBlog } from "@/types/blog";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useBlogDetail(id?: string) {
  return useSWR<
    GetBlog,
    ErrorResponse<GetBlog>,
    FetchOptions<ListOptions<GetBlog>> | null
  >(
    !id
      ? null
      : {
          path: `/api/blogs/${id}`,
        },
  );
}

export default useBlogDetail;
