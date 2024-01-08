import "client-only";
import { User, UserCreateInput } from "@/types/user";
import useMutation from "../useMutation";

function useUserCreate() {
  return useMutation<User, UserCreateInput>({
    path: "/api/users",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/users`,
      insertOnNotFound: "start",
    },
  });
}

export default useUserCreate;
