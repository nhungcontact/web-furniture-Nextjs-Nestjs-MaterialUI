import { GetOptionNull } from "@/types/option";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useOptionNullDetail(id?: string) {
  return useSWR<
    GetOptionNull,
    ErrorResponse<GetOptionNull>,
    FetchOptions<ListOptions<GetOptionNull>> | null
  >(
    !id
      ? null
      : {
          path: `/api/sku-values/option-null/${id}`,
        },
  );
}

export default useOptionNullDetail;
