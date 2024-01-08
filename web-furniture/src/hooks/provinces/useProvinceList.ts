import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import { Province } from "@/types/province";
import useSWR from "swr";

function useProvinceList(params?: ListOptions<Province>) {
  return useSWR<
    ListResponse<Province>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Province>>
  >(
    {
      path: "/api/address/provinces",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProvinceList;
