import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import { User } from "@/types/user";
import useSWR from "swr";

function useUserList(params?: ListOptions<User>) {
  return useSWR<
    ListResponse<User>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<User>>
  >(
    {
      path: "/api/users",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useUserList;
