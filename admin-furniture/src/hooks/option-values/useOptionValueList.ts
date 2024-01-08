import { GetOptionValue, OptionValue } from "@/types/option-value";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useOptionValueList(params?: ListOptions<OptionValue>) {
  return useSWR<
    ListResponse<GetOptionValue>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<OptionValue>>
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
