import { GetCategory } from "@/types/category";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCategoryList(params?: ListOptions<GetCategory>) {
  return useSWR<
    ListResponse<GetCategory>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetCategory>>
  >(
    {
      path: "/api/categories",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useCategoryList;
