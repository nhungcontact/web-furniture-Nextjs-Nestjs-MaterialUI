import { District } from "@/types/district";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useDistrictDetail(name?: string) {
  return useSWR<
    District,
    ErrorResponse<District>,
    FetchOptions<ListOptions<District>> | null
  >(
    !name
      ? null
      : {
          path: `/api/district/${name}`,
        },
  );
}

export default useDistrictDetail;
