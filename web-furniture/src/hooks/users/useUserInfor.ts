import "client-only";

import useSWR from "swr";
import useCurrentUser from "../shared/useCurrentUser";
import { fetcher } from "@/utils/fetcher";
import { ErrorResponse, ListOptions, FetchOptions } from "@/types/shared";
import { GetUser } from "@/types/user";

function useUserInfor() {
  const [userData] = useCurrentUser();
  const accessToken = userData?.accessToken;

  return useSWR<
    GetUser,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetUser>> | null
  >(
    !accessToken
      ? null
      : {
          path: `/api/users/me`,
          headers: { Authorization: `Bearer ${accessToken}` },
        },
    fetcher,
  );
}

export default useUserInfor;
