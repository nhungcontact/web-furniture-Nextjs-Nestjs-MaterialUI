import "client-only";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import { User } from "@/types/user";
import useSWR from "swr";

function useUserDetail(id?: string) {
  return useSWR<User, ErrorResponse<User>, FetchOptions<ListOptions<User>> | null>(
    !id
      ? null
      : {
          path: `/api/users/${id}`,
        },
  );
}

export default useUserDetail;
