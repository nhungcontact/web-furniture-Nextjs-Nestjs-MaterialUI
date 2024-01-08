import { GetOptionValue } from "@/types/option-value";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useOptionValueDetail(id?: string) {
  return useSWR<
    GetOptionValue,
    ErrorResponse<GetOptionValue>,
    FetchOptions<ListOptions<GetOptionValue>> | null
  >(
    !id
      ? null
      : {
          path: `/api/option-values/${id}`,
        },
  );
}

export default useOptionValueDetail;
