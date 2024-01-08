import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Size } from "@/types/size";

function useSizeList(params?: ListOptions<Size>) {
  return useSWR<
    ListResponse<Size>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Size>>
  >(
    {
      path: "/api/sizes",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useSizeList;
