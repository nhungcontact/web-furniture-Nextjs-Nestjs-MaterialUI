import { GetComment } from "@/types/comment";
import { Commune } from "@/types/commune";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCommuneDetail(name?: string) {
  return useSWR<
    Commune,
    ErrorResponse<Commune>,
    FetchOptions<ListOptions<Commune>> | null
  >(
    !name
      ? null
      : {
          path: `/api/commune/${name}`,
        },
  );
}

export default useCommuneDetail;
