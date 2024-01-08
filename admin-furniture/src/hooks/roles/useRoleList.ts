import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetRole } from "@/types/role";

function useRoleList(params?: ListOptions<GetRole>) {
  return useSWR<
    ListResponse<GetRole>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetRole>>
  >(
    {
      path: "/api/roles",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useRoleList;
