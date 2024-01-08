import { DisplayOption } from "@/types/display-option";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useDisplayOptionDetail(id?: string) {
  return useSWR<
    DisplayOption,
    ErrorResponse<DisplayOption>,
    FetchOptions<ListOptions<DisplayOption>> | null
  >(
    !id
      ? null
      : {
          path: `/api/display-options/${id}`,
        },
  );
}

export default useDisplayOptionDetail;
