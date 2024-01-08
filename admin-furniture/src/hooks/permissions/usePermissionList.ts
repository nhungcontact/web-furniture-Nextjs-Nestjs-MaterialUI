import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GetPermission } from "@/types/permission";

function usePermissionList(params?: ListOptions<GetPermission>) {
  return useSWR<
    ListResponse<GetPermission>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetPermission>>
  >(
    {
      path: "/api/permissions",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default usePermissionList;
