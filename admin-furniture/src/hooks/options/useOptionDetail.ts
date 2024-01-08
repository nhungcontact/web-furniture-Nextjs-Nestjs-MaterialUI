import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";
import { Option } from "@/types/option";

function useOptionDetail(id?: string) {
  return useSWR<Option, ErrorResponse<Option>, FetchOptions<ListOptions<Option>> | null>(
    !id
      ? null
      : {
          path: `/api/options/${id}`,
        },
  );
}

export default useOptionDetail;
