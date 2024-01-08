import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { GroupPermission } from "@/types/group-permission";

function useGroupPermissionList(params?: ListOptions<GroupPermission>) {
  return useSWR<
    ListResponse<GroupPermission>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GroupPermission>>
  >(
    {
      path: "/api/group-permissions",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useGroupPermissionList;
