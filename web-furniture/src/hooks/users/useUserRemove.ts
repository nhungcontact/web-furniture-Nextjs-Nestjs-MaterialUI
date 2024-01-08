import "client-only";
import { User } from "@/types/user";
import useMutation from "../useMutation";

function useUserRemove(id: string) {
  return useMutation<User, unknown>({
    path: `/api/users/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/users`,
      shouldRemove: true,
    },
  });
}

export default useUserRemove;
