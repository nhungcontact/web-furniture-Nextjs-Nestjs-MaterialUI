import { DisplayOption } from "@/types/display-option";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useDisplayOptionList(params?: ListOptions<DisplayOption>) {
  return useSWR<
    ListResponse<DisplayOption>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<DisplayOption>>
  >(
    {
      path: "/api/display-options",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useDisplayOptionList;
