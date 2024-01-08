import "client-only";
import { User, UserUpdateInput } from "@/types/user";
import useMutation from "../useMutation";

function useUserUpdate(id: string) {
  return useMutation<User, UserUpdateInput>({
    path: `/api/users/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/users`,
    },
  });
}

export default useUserUpdate;
