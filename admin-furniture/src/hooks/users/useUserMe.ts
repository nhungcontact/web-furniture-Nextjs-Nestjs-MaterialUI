import "client-only";

import { TokenResponse, UserUpdateInput } from "@/types/user";
import useMutation from "../useMutation";

function useUserMe() {
  return useMutation<TokenResponse, UserUpdateInput>({
    path: "/api/auth/login",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/auth`,
      insertOnNotFound: "start",
    },
  });
}

export default useUserMe;
