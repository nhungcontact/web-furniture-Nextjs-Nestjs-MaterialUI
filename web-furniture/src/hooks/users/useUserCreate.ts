import "client-only";
import { User, UserCreateInput } from "@/types/user";
import useMutation from "../useMutation";

function useUserCreate() {
  return useMutation<User, UserCreateInput>({
    path: "/api/auth/signup",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/auth`,
      insertOnNotFound: "start",
    },
  });
}

export default useUserCreate;
