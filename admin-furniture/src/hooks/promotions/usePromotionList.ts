import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { Promotion } from "@/types/promotion";

function usePromotionList(params?: ListOptions<Promotion>) {
  return useSWR<
    ListResponse<Promotion>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<Promotion>>
  >(
    {
      path: "/api/promotions",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default usePromotionList;
