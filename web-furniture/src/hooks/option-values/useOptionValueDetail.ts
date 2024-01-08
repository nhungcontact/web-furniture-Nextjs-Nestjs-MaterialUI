import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";
import { OptionValue } from "@/types/option-value";

function useOptionValueDetail(id?: string) {
  return useSWR<
    OptionValue,
    ErrorResponse<OptionValue>,
    FetchOptions<ListOptions<OptionValue>> | null
  >(
    !id
      ? null
      : {
          path: `/api/option-values/${id}`,
        },
  );
}

export default useOptionValueDetail;
