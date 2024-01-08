import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import { Commune } from "@/types/commune";
import useSWR from "swr";

function useCommuneList(id?: string) {
  return useSWR<
    ListResponse<Commune>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Commune>> | null
  >(
    !id
      ? null
      : {
          path: `/api/address/district/${id}/communes`,
        },
    {
      keepPreviousData: true,
    },
  );
}

export default useCommuneList;
