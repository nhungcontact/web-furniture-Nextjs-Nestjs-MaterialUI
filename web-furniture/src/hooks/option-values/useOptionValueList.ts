import { GetOptionValue } from "@/types/option-value";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useOptionValueList(params?: ListOptions<GetOptionValue>) {
  return useSWR<
    ListResponse<GetOptionValue>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetOptionValue>>
  >(
    {
      path: "/api/option-values",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useOptionValueList;
