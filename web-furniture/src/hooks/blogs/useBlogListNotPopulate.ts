import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Blog } from "@/types/blog";

function useBlogListNotPopulate(params?: ListOptions<Blog>) {
  return useSWR<
    ListResponse<Blog>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Blog>>
  >(
    {
      path: "/api/blogs/category-duplicate",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useBlogListNotPopulate;
