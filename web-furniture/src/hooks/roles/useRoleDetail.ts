import { GetRole } from "@/types/role";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useRoleDetail(id?: string) {
  return useSWR<
    GetRole,
    ErrorResponse<GetRole>,
    FetchOptions<ListOptions<GetRole>> | null
  >(
    !id
      ? null
      : {
          path: `/api/roles/${id}`,
        },
  );
}

export default useRoleDetail;
