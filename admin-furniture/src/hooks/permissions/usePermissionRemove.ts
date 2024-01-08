import "client-only";
import useMutation from "../useMutation";
import { Permission } from "@/types/permission";

function usePermissionRemove(id: string) {
  return useMutation<Permission, unknown>({
    path: `/api/permissions/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/permissions`,
      shouldRemove: true,
    },
  });
}

export default usePermissionRemove;
