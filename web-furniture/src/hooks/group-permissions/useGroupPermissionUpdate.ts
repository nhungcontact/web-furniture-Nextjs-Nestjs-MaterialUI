import "client-only";
import useMutation from "../useMutation";
import { GroupPermission, GroupPermissionUpdateInput } from "@/types/group-permission";

function useGroupPermissionUpdate(id: string) {
  return useMutation<GroupPermission, GroupPermissionUpdateInput>({
    path: `/api/group-permissions/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/group-permissions`,
    },
  });
}

export default useGroupPermissionUpdate;
