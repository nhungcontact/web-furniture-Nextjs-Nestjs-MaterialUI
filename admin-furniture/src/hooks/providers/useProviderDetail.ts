import { Provider } from "@/types/provider";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProviderDetail(id?: string) {
  return useSWR<
    Provider,
    ErrorResponse<Provider>,
    FetchOptions<ListOptions<Provider>> | null
  >(
    !id
      ? null
      : {
          path: `/api/providers/${id}`,
        },
  );
}

export default useProviderDetail;
