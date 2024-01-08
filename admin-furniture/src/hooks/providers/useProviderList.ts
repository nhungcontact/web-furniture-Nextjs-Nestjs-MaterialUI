import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Provider } from "@/types/provider";

function useProviderList(params?: ListOptions<Provider>) {
  return useSWR<
    ListResponse<Provider>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Provider>>
  >(
    {
      path: "/api/providers",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProviderList;
