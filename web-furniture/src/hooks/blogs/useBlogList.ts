import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Blog, GetBlog } from "@/types/blog";

function useBlogList(params?: ListOptions<Blog>) {
  return useSWR<
    ListResponse<GetBlog>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Blog>>
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
