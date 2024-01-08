import { GetUser, UserSignIn } from "@/types/user";
import "client-only";
import useMutation from "../useMutation";

function useUserLogin() {
  return useMutation<GetUser, UserSignIn>({
    path: "/api/users/login",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/users`,
      insertOnNotFound: "start",
    },
  });
}

export default useUserLogin;
