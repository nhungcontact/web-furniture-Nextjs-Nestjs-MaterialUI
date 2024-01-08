import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Shipping } from "@/types/shipping";

function useShippingList(params?: ListOptions<Shipping>) {
  return useSWR<
    ListResponse<Shipping>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Shipping>>
  >(
    {
      path: "/api/shippings",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useShippingList;
