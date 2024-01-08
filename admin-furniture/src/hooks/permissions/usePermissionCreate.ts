import "client-only";
import useMutation from "../useMutation";
import { Permission, PermissionCreateInput } from "@/types/permission";

function usePermissionCreate() {
  return useMutation<Permission, PermissionCreateInput>({
    path: "/api/permissions",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/permissions`,
      insertOnNotFound: "start",
    },
  });
}

export default usePermissionCreate;
