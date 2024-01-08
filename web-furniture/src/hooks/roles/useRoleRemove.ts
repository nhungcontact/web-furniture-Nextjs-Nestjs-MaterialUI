import "client-only";
import useMutation from "../useMutation";
import { Role } from "@/types/role";

function useRoleRemove(id: string) {
  return useMutation<Role, unknown>({
    path: `/api/roles/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/roles`,
      shouldRemove: true,
    },
  });
}

export default useRoleRemove;
