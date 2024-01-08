import "client-only";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import { GetUser, User } from "@/types/user";
import useSWR from "swr";

function useUserDetail(id?: string) {
  return useSWR<GetUser, ErrorResponse<GetUser>, FetchOptions<ListOptions<User>> | null>(
    !id
      ? null
      : {
          path: `/api/users/${id}`,
        },
  );
}

export default useUserDetail;
