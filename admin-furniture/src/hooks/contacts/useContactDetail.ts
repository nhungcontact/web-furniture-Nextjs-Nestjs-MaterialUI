import { Contact } from "@/types/contact";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useContactDetail(id?: string) {
  return useSWR<
    Contact,
    ErrorResponse<Contact>,
    FetchOptions<ListOptions<Contact>> | null
  >(
    !id
      ? null
      : {
          path: `/api/contacts/${id}`,
        },
  );
}

export default useContactDetail;
