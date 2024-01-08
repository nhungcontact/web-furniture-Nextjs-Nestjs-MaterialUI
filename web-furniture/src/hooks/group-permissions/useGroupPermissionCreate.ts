import "client-only";
import useMutation from "../useMutation";
import { GroupPermission, GroupPermissionCreateInput } from "@/types/group-permission";

function useGroupPermissionCreate() {
  return useMutation<GroupPermission, GroupPermissionCreateInput>({
    path: "/api/group-permissions",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/group-permissions`,
      insertOnNotFound: "start",
    },
  });
}

export default useGroupPermissionCreate;
