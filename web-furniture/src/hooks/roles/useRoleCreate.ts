import "client-only";
import useMutation from "../useMutation";
import { Role, RoleCreateInput } from "@/types/role";

function useRoleCreate() {
  return useMutation<Role, RoleCreateInput>({
    path: "/api/roles",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/roles`,
      insertOnNotFound: "start",
    },
  });
}

export default useRoleCreate;
