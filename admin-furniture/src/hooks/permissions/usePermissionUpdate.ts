import "client-only";
import useMutation from "../useMutation";
import { Permission, PermissionUpdateInput } from "@/types/permission";

function usePermissionUpdate(id: string) {
  return useMutation<Permission, PermissionUpdateInput>({
    path: `/api/permissions/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/permissions`,
    },
  });
}

export default usePermissionUpdate;
