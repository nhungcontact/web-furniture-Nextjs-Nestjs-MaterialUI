import { Option } from "@/types/option";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useOptionList(params?: ListOptions<Option>) {
  return useSWR<
    ListResponse<Option>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Option>>
  >(
    {
      path: "/api/options",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useOptionList;
