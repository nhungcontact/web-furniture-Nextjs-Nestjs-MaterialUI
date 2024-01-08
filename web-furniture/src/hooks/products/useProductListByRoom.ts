import { GetProduct } from "@/types/product";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useProductListByRoom(params?: ListOptions<GetProduct>) {
  return useSWR<
    ListResponse<GetProduct>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<GetProduct>>
  >(
    {
      path: `/api/products/room-furniture`,
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProductListByRoom;
