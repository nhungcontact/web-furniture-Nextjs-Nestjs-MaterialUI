import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import { Shipping } from "@/types/shipping";
import "client-only";
import useSWR from "swr";

function useShippingDetail(id?: string) {
  return useSWR<
    Shipping,
    ErrorResponse<Shipping>,
    FetchOptions<ListOptions<Shipping>> | null
  >(
    !id
      ? null
      : {
          path: `/api/shippings/${id}`,
        },
  );
}

export default useShippingDetail;
