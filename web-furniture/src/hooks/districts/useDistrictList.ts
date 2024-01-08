import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import { District } from "@/types/district";
import useSWR from "swr";

function useDistrictList(id?: string) {
  return useSWR<
    ListResponse<District>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<District>> | null
  >(
    !id
      ? null
      : {
          path: `/api/address/province/${id}/districts`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useDistrictList;
