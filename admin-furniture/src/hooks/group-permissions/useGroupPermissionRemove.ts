import "client-only";
import useMutation from "../useMutation";
import { GroupPermission } from "@/types/group-permission";

function useGroupPermissionRemove(id: string) {
  return useMutation<GroupPermission, unknown>({
    path: `/api/group-permissions/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/group-permissions`,
      shouldRemove: true,
    },
  });
}

export default useGroupPermissionRemove;
