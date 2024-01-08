import { GetPermission } from "@/types/permission";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function usePermissionDetail(code?: string) {
  return useSWR<
    GetPermission,
    ErrorResponse<GetPermission>,
    FetchOptions<ListOptions<GetPermission>> | null
  >(
    !code
      ? null
      : {
          path: `/api/permissions/by-code/${code}`,
        },
  );
}

export default usePermissionDetail;
