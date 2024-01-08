import "client-only";
import useMutation from "../useMutation";
import { Role, RoleUpdateInput } from "@/types/role";

function useRoleUpdate(id: string) {
  return useMutation<Role, RoleUpdateInput>({
    path: `/api/roles/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/roles`,
    },
  });
}

export default useRoleUpdate;
