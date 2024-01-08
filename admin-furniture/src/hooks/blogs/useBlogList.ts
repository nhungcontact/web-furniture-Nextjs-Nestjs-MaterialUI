import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetBlog } from "@/types/blog";

function useBlogList(params?: ListOptions<GetBlog>) {
  return useSWR<
    ListResponse<GetBlog>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetBlog>>
  >(
    {
      path: "/api/blogs",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useBlogList;
