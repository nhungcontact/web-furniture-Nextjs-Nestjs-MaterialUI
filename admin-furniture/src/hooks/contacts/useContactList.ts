import { Contact } from "@/types/contact";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useContactList(params?: ListOptions<Contact>) {
  return useSWR<
    ListResponse<Contact>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Contact>>
  >(
    {
      path: "/api/contacts",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useContactList;
