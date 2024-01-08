import { Province } from "@/types/province";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProvinceDetail(name?: string) {
  return useSWR<
    Province,
    ErrorResponse<Province>,
    FetchOptions<ListOptions<Province>> | null
  >(
    !name
      ? null
      : {
          path: `/api/province/${name}`,
        },
  );
}

export default useProvinceDetail;
